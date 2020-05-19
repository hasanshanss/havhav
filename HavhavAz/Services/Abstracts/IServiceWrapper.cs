using HavhavAz.Models.AdModels;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HavhavAz.Models.ImageModels;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.VetModels;
using HavhavAz.Models.ShelterModels;

namespace HavhavAz.Services.Interfaces
{
    public interface IServiceWrapper
    {
        ICRUDService<Charity> CharityCRUDService { get; }
        ICRUDService<Ad> AdCRUDService { get; }
        ICRUDService<Post> PostCRUDService { get; }
        ICRUDService<Vet> VetCRUDService { get; }
        ICRUDService<Shelter> ShelterCRUDService { get; }

        ITranslateService<PostTranslations> PostTranslateService { get; }
        ITranslateService<VetViewModel> VetTranslateService { get; }
        ITranslateService<ShelterViewModel> ShelterTranslateService { get; }

        IUserManager<User> UserManager { get; }
        
        IMessageService MessageService { get; }
        ICommentService CommentService { get; }
        IReceiptService ReceiptService { get; }
        INotificationService NotificationService { get; }
        IPostService PostService { get; }

        ITypeService<ForumType> ForumTypeService { get; }

    }
}
