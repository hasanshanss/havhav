using HavhavAz.Models;
using HavhavAz.Models.PostModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface IPostService
    {
        Int32 GetSubjectUserId(Post.PostTypes PostType, Int32 SubjectId);
        Task<Int32> GetSubjectUserIdAsync(Post.PostTypes PostType, Int32 SubjectId);

        Int32 GetSubjectUserId(Int32 PostId);
        Task<Int32> GetSubjectUserIdAsync(Int32 PostId);

        Int32 GetUserId(Int32 PostId);
        Task<Int32> GetUserIdAsync(Int32 PostId);

        int GetCount(Post.PostTypes PostType, Int32 SubjectId, Culture? culture = null);
        Task<int> GetCountAsync(Post.PostTypes PostType, Int32 SubjectId, Culture? culture = null);

        string GetPostTitle(Int32 PostId, Culture? culture = null);
        Task<string> GetPostTitleAsync(Int32 PostId, Culture? culture = null);

        bool IsExisted(int PostId);
        Task<bool> IsExistedAsync(int PostId);

        int IncrementView(int PostId);
        Task<int> IncrementViewAsync(int PostId);
    }
}
