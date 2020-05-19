using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.PostModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services
{
    public class PostService : IPostService
    {
        private ApplicationDbContext _db;

        public PostService(ApplicationDbContext db)
        {

            _db = db;
        }

        public int GetCount(Post.PostTypes PostType, Int32 SubjectId, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(Post.PostTypes PostType, Int32 SubjectId, Culture? culture = null)
        {
            return _db.Posts
                        .AsNoTracking()
                        .Where(m => m.PostType == PostType && (m.SubjectId == SubjectId)
                               && (m.PostTranslations.Any(pt => pt.Culture == culture)) 
                               && m.State == State.Approved)
                        .CountAsync();
        }

        public string GetPostTitle(int PostId, Culture? culture = null)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetPostTitleAsync(int PostId, Culture? culture = null)
        {
            return await _db.PostTranslations
                                .AsNoTracking()
                                .Where(m => m.PostId == PostId && m.Culture == culture)
                                .Select(m=>m.Title)
                                .FirstOrDefaultAsync();
        }

        public Int32 GetSubjectUserId(Post.PostTypes PostType, Int32 SubjectId)
        {
            switch (PostType)
            {
                case Post.PostTypes.Ad:
                    return _db.Ads
                        .AsNoTracking()
                        .Where(m => m.ID == SubjectId)
                        .Select(m => m.UserId)
                        .FirstOrDefault();

                case Post.PostTypes.Charity:
                    return _db.Charities
                        .AsNoTracking()
                        .Where(m => m.ID == SubjectId)
                        .Select(m => m.UserId)
                        .FirstOrDefault();
            }


            return 0;
        }

        public int GetSubjectUserId(int PostId)
        {
            throw new NotImplementedException();
        }

        public async Task<Int32> GetSubjectUserIdAsync(Post.PostTypes PostType, Int32 SubjectId)
        {
            switch (PostType)
            {
                case Post.PostTypes.Ad:
                    return await _db.Ads
                        .AsNoTracking()
                        .Where(m => m.ID == SubjectId)
                        .Select(m => m.UserId)
                        .FirstOrDefaultAsync();

                case Post.PostTypes.Charity:
                    return await _db.Charities
                        .AsNoTracking()
                        .Where(m => m.ID == SubjectId)
                        .Select(m => m.UserId)
                        .FirstOrDefaultAsync();
                default:
                    return SubjectId;
            }
        }

        public async Task<int> GetSubjectUserIdAsync(int PostId)
        {
            Post post = await _db.Posts
                                .AsNoTracking()
                                .FirstOrDefaultAsync(m => m.ID == PostId);
            if (post != null)
            {
                return await GetSubjectUserIdAsync(post.PostType, post.SubjectId);
            } else
            {
                return 0;
            }

        }

        public int GetUserId(int PostId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetUserIdAsync(int PostId)
        {
            return await _db.Posts
                            .AsNoTracking()
                            .Where(m => m.ID == PostId)
                            .Select(m => m.UserId)
                            .FirstOrDefaultAsync();
        }

        public int IncrementView(int PostId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> IncrementViewAsync(int PostId)
        {
            Post post = await _db.Posts.FirstOrDefaultAsync(m => m.ID == PostId);
            if (post != null)
            {
                post.Views++;
                await _db.SaveChangesAsync();
            }
            return post.Views;
        }

        public bool IsExisted(int PostId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsExistedAsync(int PostId)
        {
            return await _db.Posts.AnyAsync(m => m.ID == PostId && m.State == State.Approved);
        }
    }
}
