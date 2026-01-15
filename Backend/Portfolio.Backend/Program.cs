using System.Net;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

// Retrieve settings from appsettings.json
var smtpEmail = builder.Configuration["SmtpSettings:Email"];
var smtpPass = builder.Configuration["SmtpSettings:Password"];

// 1. Updated CORS: Added common React ports (3000 and 5173)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:5173") 
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .SetIsOriginAllowedToAllowWildcardSubdomains());
});

// 2. Configure FluentEmail
builder.Services
    .AddFluentEmail("server@tarek.dev")
    .AddSmtpSender(new SmtpClient("smtp.gmail.com")
    {
        Port = 587,
        Credentials = new NetworkCredential(smtpEmail, smtpPass),
        EnableSsl = true,
    });

builder.Services.AddControllers();

var app = builder.Build();

// CRITICAL: UseCors must come BEFORE MapControllers
app.UseCors("AllowReactApp");

app.MapControllers();

app.Run();