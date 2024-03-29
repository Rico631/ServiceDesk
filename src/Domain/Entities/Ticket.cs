﻿using System;
using System.Collections.Generic;
using ServiceDesk.Domain.Common;
using ServiceDesk.Domain.Enums;

namespace ServiceDesk.Domain.Entities
{
    public class Ticket : AuditableEntity
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Issue { get; set; }
        public Guid DeskId { get; set; }
        public Desk Desk { get; set; }
        public Status Status { get; set; } = Status.Open;
        public IList<Comment> Comments { get; set; } = new List<Comment>();

        public static Ticket Create(string description, string issue)
        {
            return new Ticket
            {
                Description = description,
                Issue = issue
            };
        }

        public void UpdateStatus(Status status)
        {
            Status = status;
        }
    }
}