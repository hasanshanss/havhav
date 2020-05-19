using HavhavAz.Data;
using HavhavAz.Models;
using HavhavAz.Models.CharityModels;
using HavhavAz.Models.UserModels;
using HavhavAz.Services.Interfaces;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace HavhavAz.Services
{
    public class ReceiptService : IReceiptService
    {
        private IList<Receipt> _receiptList;
        private ApplicationDbContext _db;
        private IUserManager<User> _UserManager;

        public ReceiptService(ApplicationDbContext db,
                            IServiceWrapper services)
        {
            _UserManager = services.UserManager;
            _db = db;
        }

        public void AddReceipt(Receipt receipt)
        {
            _db.Receipts.Add(receipt);
            _db.SaveChanges();
        }

        public async Task AddReceiptAsync(Receipt receipt)
        {
            await _db.Receipts.AddAsync(receipt);
            await _db.SaveChangesAsync();
        }

        public int ChangeState(Int32 ReceiptId, State state)
        {
            Receipt receipt = _db.Receipts.Find(ReceiptId);
            receipt.State = state;

            if (state == State.Canceled)
            {
                _db.SaveChanges();
                return 0;
            }
            else
            {
                return  AddAmount(receipt.CharityId, receipt.Amount);
            }
        }

        public async Task<int> ChangeStateAsync(Int32 ReceiptId, State state)
        {
            Receipt receipt = await _db.Receipts.FindAsync(ReceiptId);
            receipt.State = state;

            if(state == State.Canceled)
            {
                await _db.SaveChangesAsync();
                return  1;
            } else
            {
                return await AddAmountAsync(receipt.CharityId, receipt.Amount);
            }
            
        }

        public Charity GetCharity(int ReceiptId)
        {
            throw new NotImplementedException();
        }

        public async Task<Charity> GetCharityAsync(int ReceiptId)
        {
            return await _db.Receipts
                            .AsNoTracking()
                            .Where(m => m.ID == ReceiptId)
                            .Select(m => m.Charity)
                            .FirstOrDefaultAsync();
        }

        public Int32 GetCharityId(Int32 ReceiptId)
        {
            return _db.Receipts.AsNoTracking().Where(m => m.ID == ReceiptId).Select(m => m.CharityId).FirstOrDefault();
        }

        public async Task<Int32> GetCharityIdAsync(Int32 ReceiptId)
        {
            Int32 CharityId = await _db.Receipts
                                        .AsNoTracking()
                                        .Where(m => m.ID == ReceiptId)
                                        .Select(m => m.CharityId)
                                        .FirstOrDefaultAsync();
            return CharityId;
        }

        public int GetReceiptCount(Int32 CharityId)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetReceiptCountAsync(Int32 CharityId)
        {
            throw new NotImplementedException();
        }

        public IList<Receipt> GetReceiptList(Int32 CharityId, State State)
        {
            return _db.Receipts.Where(m => m.CharityId == CharityId && m.State == State).ToList();
        }

        public async Task<IList<Receipt>> GetReceiptListAsync(Int32 CharityId, State State)
        {
            return await _db.Receipts.Where(m => m.CharityId == CharityId && m.State == State).ToListAsync();
        }

        public void RemoveById(int ReceiptId)
        {
            throw new NotImplementedException();
        }

        public async Task RemoveByIdAsync(int ReceiptId)
        {
            Receipt receipt = new Receipt { ID = ReceiptId };
            _db.Receipts.Remove(receipt);
            await _db.SaveChangesAsync();
        }

        private int AddAmount(Int32 CharityId, int amount)
        {
            Charity charity = _db.Charities.Where(m => m.ID == CharityId && m.State != Models.State.Canceled).FirstOrDefault();
            charity.CollectedAmount += amount;
            if (charity.CollectedAmount >= charity.Amount)
            {
                charity.State = State.Finished;
            }
            _db.SaveChanges();

            return amount;
            
        }

        private async Task<int> AddAmountAsync(Int32 CharityId, int amount)
        {
            Charity charity = await _db.Charities.Where(m => m.ID == CharityId).FirstOrDefaultAsync();
            charity.CollectedAmount += amount;
            if (charity.CollectedAmount >= charity.Amount)
            {
                charity.State = State.Finished;
            }
            await _db.SaveChangesAsync();

            return amount;
        }

       
    }
}
