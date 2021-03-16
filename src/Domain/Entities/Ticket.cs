﻿using System;
using ServiceDesk.Domain.Common;

namespace ServiceDesk.Domain.Entities
{
    public class Ticket : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Issue { get; set; }

        public static Ticket Create(string description, string issue)
        {
            return new Ticket
            {
                Description = description,
                Issue = issue
            };
        }
    }
}