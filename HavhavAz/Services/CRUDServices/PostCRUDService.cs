using HavhavAz.Data;
using HavhavAz.Models.UserModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using HavhavAz.Models;
using System.Data.Common;

namespace HavhavAz.Services.CRUD
{
    public class PostCRUDService : ICRUDService<Post>
    {
        private ApplicationDbContext _db;
        private IUserManager<User> _UserManager { get; set; }

        public PostCRUDService(ApplicationDbContext db,
                               IServiceWrapper services)
        {
            _UserManager = services.UserManager;
            _db = db;

        }

        public void Add(Post model, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(Post post, Culture? culture = null)
        {
            await _db.Posts.AddAsync(post);
            await _db.SaveChangesAsync();
        }


        public Post GetModelById(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Post> GetModelByIdAsync(Int32 id, Culture? culture = null)
        {
            Post post = await _db.Posts
                                    .Where(m=>m.PostTranslations.Any(pt=>pt.Culture == culture))
                                    .FirstOrDefaultAsync(m => m.ID == id);
            if (post != null)
            {
                await _db.Entry(post)
                           .Collection(m => m.PostTranslations)
                           .Query()
                           .Where(m => m.Culture == culture)
                           .FirstAsync();
            }

            return post;

        }

        public Post GetModel(Culture? culture = null, Expression<Func<Post, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetModelAsync(Culture? culture = null, Expression<Func<Post, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

     
        public IList<Post> GetModelList(Culture? culture = null,
                                    string keyword = "",
                                    int page = 1,
                                    State state = State.Approved,
                                    Expression<Func<Post, bool>> predicate = null)
        {

            throw new NotImplementedException();
        }

        public async Task<IList<Post>> GetModelListAsync(Culture? culture = 0,
                                    string keyword = "",
                                    int page = 1,
                                    State state = State.Approved,
                                    Expression<Func<Post, bool>> predicate = null)
        {
            int pageElements = 15;
            int skip = (page - 1) * pageElements;

            var query = _db.Posts
                        .Where(m => m.State == state && m.PostTranslations.Any(pt => pt.Culture == culture))
                        .Skip(skip)
                        .Take(pageElements)
                        .OrderByDescending(m=>m.CreatedDate)
                        .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            else if (!String.IsNullOrEmpty(keyword))
            {
                query = query.Where(m => m.PostTranslations
                                          .Any(pt => (pt.Title.Contains(keyword)
                                                   || pt.Content.Contains(keyword)))
                                   );
            }

            IList<Post> postList = await query.ToListAsync();

            foreach (Post post in postList)
            {
                if (post != null)
                {
                    await _db.Entry(post)
                            .Collection(m => m.PostTranslations)
                            .Query()
                            .Where(m => m.Culture == culture)
                            .FirstAsync();
                }
            }

            return postList;
        }

        public string GetModelName(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetModelNameAsync(Int32 id, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public void AddAsync(Post model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Post post, Culture? culture = null, bool isAdmin = false)
        {
                post.LastActionDate = DateTime.Now.AddHours(11);
                _db.Entry(post).Property(m => m.LastActionDate).IsModified = true;

                PostTranslations pt = post.PostTranslations.First();
                var ptEntry= _db.Entry(pt);
                ptEntry.Property(e => e.Title).IsModified = true;
                ptEntry.Property(e => e.Content).IsModified = true;

                await _db.SaveChangesAsync();
        }

        public void Remove(Int32 id)
        {
            _db.Posts.Remove(new Post { ID = id });
            DeleteFolder($"posts/{id}");
            _db.SaveChanges();
        }

        public async Task RemoveAsync(Int32 id)
        {
            _db.Posts.Remove(new Post { ID = id });
            DeleteFolder($"posts/{id}");
            await _db.SaveChangesAsync();
        }

        public Int32 GetUserId(Int32 id, Expression<Func<Post, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Int32> GetUserIdAsync(Int32 id, Expression<Func<Post, bool>> predicate = null)
        {
            var query = _db.Posts
                .AsNoTracking()
                .Where(m => m.ID == id)
                .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return await query.Select(m => m.UserId).FirstOrDefaultAsync();
        }

        public int GetCount(Culture? culture = null, Expression<Func<Post, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetCountAsync(Culture? culture = null, Expression<Func<Post, bool>> predicate = null)
        {
            var query = _db.Posts
                            .AsNoTracking()
                            .Where(m => m.PostTranslations.Any(at => at.Culture == culture) && m.State == State.Approved)
                            .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return await query.CountAsync();
        }

        public void ChangeState(int id, State state)
        {
            throw new NotImplementedException();
        }

        public async Task ChangeStateAsync(int id, State state)
        {
            Post post  = await _db.Posts.FirstOrDefaultAsync(m => m.ID == id);

            if (post != null)
            {
                post.State = state;
                await _db.SaveChangesAsync();
            }
        }

        public void Update(Post model, Culture? culture = null, bool isAdmin = false)
        {
            throw new NotImplementedException();
        }
    }
}
