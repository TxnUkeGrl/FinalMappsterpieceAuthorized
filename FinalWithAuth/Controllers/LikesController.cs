using FinalWithAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalWithAuth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class LikesController : Controller
    {
        private readonly MappsterpiecesDBContext _context;
        public LikesController(MappsterpiecesDBContext context)
        {
            _context = context;
        }

        //UDPATE: api/likes/updateLike
        [HttpPut("UpdateLike/{entryId}")]
        public async Task<ActionResult<TheLikes>> UpdateLike(TheLikes like, int entryId)
        {
            if (entryId != like.EntryId || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                TheLikes dbLike = _context.TheLikes.Find(entryId);

                dbLike.ObjectId = like.ObjectId;
                dbLike.Department = like.Department;
                dbLike.title = like.title;
                dbLike.VisitedObject = like.VisitedObject;
                dbLike.artistDisplayName = like.artistDisplayName;
                dbLike.primaryImage = like.primaryImage;
                dbLike.artistDisplayBio = like.artistDisplayBio;
                dbLike.medium = like.medium;
                dbLike.objectDate = like.objectDate;

                _context.Entry(dbLike).State = EntityState.Modified;
                _context.Update(dbLike);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        //DELETE: api/likes/delete/{entryId}
        [HttpDelete("delete/{entryId}")]
        public async Task<ActionResult> DeleteLike(int entryId)
        {
            var like = await _context.TheLikes.FindAsync(entryId);
            if (like == null)
            {
                return NotFound();
            }
            else
            {
                _context.TheLikes.Remove(like);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        ////api/met/likes/{user}
        [HttpGet("getLikes")]
        public async Task<ActionResult<List<TheLikes>>> GetAllLikes()
        {
            var likes = await _context.TheLikes.ToListAsync();
            return likes;
        }

        [HttpGet("getlike/{entryid}")]
        public async Task<ActionResult<TheLikes>> GetLike(int entryId)
        {
            var like = await _context.TheLikes.FindAsync(entryId);
            if (like == null)
            {
                return NotFound();
            }
            else
            {
                return like;
            }
        }

        [HttpPost("NewLike")]
        public async Task<ActionResult<TheLikes>> AddLike(MetObject.Rootobject mObj)
        {
            var newLike = new TheLikes();

            newLike.ObjectId = mObj.objectID;
            newLike.Department = mObj.department;
            newLike.title = mObj.title;
            newLike.artistDisplayName = mObj.artistDisplayName;
            newLike.primaryImage = mObj.primaryImage;
            newLike.artistDisplayBio = mObj.artistDisplayBio;
            newLike.medium = mObj.medium;
            newLike.objectDate = mObj.objectDate;

            _context.TheLikes.Add(newLike);
            await _context.SaveChangesAsync();
            //return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
            return Ok(newLike);
        }

        //[HttpPut("VisitedObject")]
        //public async Task<ActionResult<TheLikes>> OnMarkAsVisited(MetObject.Rootobject mObj)
        //{

        //}
    }
}