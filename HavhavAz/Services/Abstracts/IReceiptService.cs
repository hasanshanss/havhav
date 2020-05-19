using HavhavAz.Models;
using HavhavAz.Models.CharityModels;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services.Interfaces
{
    public interface IReceiptService
    {
        IList<Receipt> GetReceiptList(Int32 CharityId, State State);
        Task<IList<Receipt>> GetReceiptListAsync(Int32 CharityId, State State);

        void AddReceipt(Receipt receipt);
        Task AddReceiptAsync(Receipt receipt);

        int GetReceiptCount(Int32 CharityId);
        Task<int> GetReceiptCountAsync(Int32 CharityId);

        Int32 GetCharityId(Int32 ReceiptId);
        Task<Int32> GetCharityIdAsync(Int32 ReceiptId);

        Charity GetCharity(Int32 ReceiptId);
        Task<Charity> GetCharityAsync(Int32 ReceiptId);

        int ChangeState(Int32 ReceiptId, State state);
        Task<int> ChangeStateAsync(Int32 ReceiptId, State state);

        void RemoveById(Int32 ReceiptId);
        Task RemoveByIdAsync(Int32 ReceiptId);

    }
}
