using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.LoggerService
{
    public class LogActionInfo
    {

        public LogActionInfo(string Ip, int UserId, string Message = null, LogAction? LogActionType = null)
        {
            this.Ip = Ip;
            this.UserId = UserId;
            this.Message = Message;
            this.LogActionType = LogActionType;
        }
        
        public string Ip { get; set; }
        public int UserId { get; set; }

        public string Message { get; set; }
        public enum LogAction
        {
            Login = 0,
            Logout = 1,
            ResetPassword = 2,
            Attempt = 3
        }

        public LogAction? LogActionType { get; set; }


    }
}
