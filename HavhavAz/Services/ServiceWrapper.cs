using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.AdModels;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.ContactsModels;
using HavhavAz.Models.ForumModels;
using HavhavAz.Models.CommentModels;
using HavhavAz.Models.NotificationModels;
using HavhavAz.Models.PostModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.CRUD;
using HavhavAz.Services.Interfaces;
using HavhavAz.Services.Types;
using HavhavAz.Models.MessageModels;
using HavhavAz.Services.TranslateServices;
using HavhavAz.Models.VetModels;
using HavhavAz.Models.ShelterModels;
using HavhavAz.Services.CRUDServices;

namespace HavhavAz.Services
{
    public class ServiceWrapper : IServiceWrapper
    {
        private readonly ApplicationDbContext _db;

        private ICRUDService<Ad> _adCRUDService;
        private ICRUDService<Charity> _charityCRUDService;
        private ICRUDService<Post> _postCRUDService;
        private ICRUDService<Vet> _vetCRUDService;
        private ICRUDService<Shelter> _shelterCRUDService;

        private ITranslateService<PostTranslations> _postTranslateService;
        private ITranslateService<VetViewModel> _vetTranslateService;
        private ITranslateService<ShelterViewModel> _shelterTranslateService;

        private INotificationService _notificationService;
        private ICommentService  _commentService;
        private IReceiptService _receiptService;
        private IMessageService _messageService;
        private IPostService _postService;
        private IUserManager<User> _UserManager;

        private ITypeService<ForumType> _forumTypeService;

        public ServiceWrapper()
        {

        }

        public IUserManager<User> UserManager
        {
            get
            {
                if (_UserManager == null)
                {
                    _UserManager = new UserManager(_db, this);
                }

                return _UserManager;
            }
        }

        public IPostService PostService
        {
            get
            {
                if (_postService == null)
                {
                    _postService = new PostService(_db);
                }

                return _postService;
            }
        }

        public IMessageService MessageService
        {
            get
            {
                if (_messageService == null)
                {
                    _messageService = new MessageService(_db, this);
                }

                return _messageService;
            }
        }

        public IReceiptService ReceiptService
        {
            get
            {
                if (_receiptService == null)
                {
                    _receiptService = new ReceiptService(_db, this);
                }

                return _receiptService;
            }
        }


        public ICommentService CommentService
        {
            get
            {
                if (_commentService == null)
                {
                    _commentService = new CommentService(_db, this);
                }

                return _commentService;
            }
        }

        public ITypeService<ForumType> ForumTypeService
        {
            get
            {
                if (_forumTypeService == null)
                {
                    _forumTypeService = new ForumTypeService(_db, this);
                }

                return _forumTypeService;
            }
        }

        public INotificationService NotificationService
        {
            get
            {
                if (_notificationService == null)
                {
                    _notificationService = new NotificationService(_db, this);
                }

                return _notificationService;
            }
        }


        public ICRUDService<Post> PostCRUDService
        {
            get
            {
                if (_postCRUDService == null)
                {
                    _postCRUDService = new PostCRUDService(_db, this);
                }

                return _postCRUDService;
            }
        }

        public ICRUDService<Vet> VetCRUDService
        {
            get
            {
                if (_vetCRUDService == null)
                {
                    _vetCRUDService = new VetCRUDService(_db, this);
                }

                return _vetCRUDService;
            }
        }

        public ICRUDService<Shelter> ShelterCRUDService
        {
            get
            {
                if (_shelterCRUDService == null)
                {
                    _shelterCRUDService = new ShelterCRUDService(_db, this);
                }

                return _shelterCRUDService;
            }
        }



        public ICRUDService<Ad> AdCRUDService
        {
            get
            {
                if (_adCRUDService == null)
                {
                    _adCRUDService = new AdCRUDService(_db, this);
                }

                return _adCRUDService;
            }
        }

     

        public ICRUDService<Charity> CharityCRUDService
        {
            get
            {
                if (_charityCRUDService == null)
                {
                    _charityCRUDService = new CharityCRUDService(_db, this);
                }

                return _charityCRUDService;
            }
        }

        
        public ITranslateService<VetViewModel> VetTranslateService
        {
            get
            {
                if (_vetTranslateService == null)
                {
                    _vetTranslateService = new VetTranslateService(_db);
                }

                return _vetTranslateService;
            }
        }

        public ITranslateService<ShelterViewModel> ShelterTranslateService
        {
            get
            {
                if (_shelterTranslateService == null)
                {
                    _shelterTranslateService = new ShelterTranslateService(_db);
                }

                return _shelterTranslateService;
            }
        }

        public ITranslateService<PostTranslations> PostTranslateService
        {
            get
            {
                if (_postTranslateService == null)
                {
                    _postTranslateService = new PostTranslateService(_db);
                }

                return _postTranslateService;
            }
        }


        public ServiceWrapper(ApplicationDbContext db)
        {
            _db = db;
        }
    }
}
