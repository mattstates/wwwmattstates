using System;

namespace mattstates.APIModels
{
    public class GitHubEvent
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public Boolean Public { get; set; }
        public Repository Repo { get; set; }
    }

    public class Repository
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}