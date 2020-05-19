using HavhavAz.Models.CommentModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface ICommentService
    {
        void AddComment(Comment comment);
        Task AddCommentAsync(Comment comment);

        void RemoveComment(Int32 CommentId);
        Task RemoveCommentAsync(Int32 CommentId);

        string[] GetInvolvedUsers(Int32 PostId, Int32[] exceptOf);
        Task<string[]> GetInvolvedUsersAsync(Int32 PostId, Int32[] exceptOf);

        CommentViewModel GetCommentList(Int32 PostId, int skip);
        Task<CommentViewModel> GetCommentListAsync(Int32 PostId, int skip);

        Int32 GetUserId(Int32 CommentId);
        Task<Int32> GetUserIdAsync(Int32 CommentId);

        //Int32 GetCount(Int32 PostId);
        //Task<Int32> GetCountAsync(Int32 PostId);
    }
}
