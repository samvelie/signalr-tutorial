using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace signalrdemo
{
    public class Chat : Hub
    {
        public async Task Send(string nick, string message, string color)
        {
            await Clients.All.InvokeAsync("Send", nick, message, color);
        }
    }
}