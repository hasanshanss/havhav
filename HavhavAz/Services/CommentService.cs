using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using static HavhavAz.Helpers.Utilities;

namespace HavhavAz.Services
{
    public class CommentService : ICommentService
    {
        private IList<Comment> _commentList;
        private ApplicationDbContext _db;
        private IUserManager<User> _UserManager;

        public CommentService(ApplicationDbContext db,
                            IServiceWrapper services)
        {
            _UserManager = services.UserManager;
            _db = db;
        }



        public async Task<CommentViewModel> GetCommentListAsync(Int32 PostId, int skip = 0)
        {
            List<CommentPublisher> _commentPublisherList = await _db.Comments
                                                    .AsNoTracking()
                                                    .Where(m => m.PostId == PostId)
                                                    .OrderByDescending(m => m.Date)
                                                    .Skip(skip)
                                                    .Take(10)
                                                    .Select(m => new CommentPublisher
                                                    {
                                                        Comment = m,
                                                        Publisher = m.User.Username,
                                                        ImagePath = GetMainPic("users", m.User.Username, "")
                                                    })
                                                    .ToListAsync();
            if(skip == 0)
            {
                _commentPublisherList.Reverse();
            }
            

            int Count = await _db.Comments
                                .AsNoTracking()
                                .Where(m => m.PostId == PostId)
                                .CountAsync();

            return new CommentViewModel
            {
                CommentPublisherList = _commentPublisherList,
                HasNext = (Count - (skip+10)) > 0
            };

        }

        public void AddComment(Comment comment)
        {
            throw new NotImplementedException();
        }

        public async Task AddCommentAsync(Comment comment)
        {
            await _db.Comments.AddAsync(comment);
            await _db.SaveChangesAsync();
        }

        public CommentViewModel GetCommentList(Int32 PostId, int skip)
        {
            throw new NotImplementedException();
        }

        public string[] GetInvolvedUsers(Int32 PostId, Int32[] exceptOf)
        {
            throw new NotImplementedException();
        }

        public async Task<string[]> GetInvolvedUsersAsync(Int32 PostId, Int32[] exceptOf)
        {
            return await _db.Comments.Where(m => m.PostId == PostId && !exceptOf.Contains(m.UserId))
                                     .Select(m => m.UserId.ToString().ToLower())
                                     .Distinct()
                                     .ToArrayAsync();
        }

        public int GetUserId(int CommentId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetUserIdAsync(int CommentId)
        {
            return await _db.Comments
                            .AsNoTracking()
                            .Where(m=>m.ID == CommentId)
                            .Select(m=>m.UserId)
                            .FirstOrDefaultAsync();
        }

        public void RemoveComment(Int32 CommentId)
        {
            throw new NotImplementedException();
        }

        public async Task RemoveCommentAsync(Int32 CommentId)
        {
            _db.Remove(new Comment { ID = CommentId});
            await _db.SaveChangesAsync();
        }
    }
}
