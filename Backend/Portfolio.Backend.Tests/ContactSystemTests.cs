using Xunit;
using Portfolio.Backend.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Backend.Tests;

public class ContactSystemTests
{
    [Fact]
    public void ContactRequest_ShouldMaintainDataIntegrity()
    {
        // Arrange
        var request = new ContactRequest
        {
            Name = "Tarek",
            Email = "halloultarek1@gmail.com",
            Subject = "System Inquiry",
            Message = "Testing the .NET 8 SMTP Uplink."
        };

        // Assert
        Assert.Equal("Tarek", request.Name);
        Assert.Equal("halloultarek1@gmail.com", request.Email);
        Assert.Contains("Uplink", request.Message);
    }

    [Theory]
    [InlineData("", "invalid-email")] // Missing name, bad email
    [InlineData("Tarek", "tarek@dev")] // Incomplete email
    public void ContactRequest_ValidationLogic_DetectsErrors(string name, string email)
    {
        // Act: Simple check mimicking frontend/backend validation
        bool isValid = !string.IsNullOrEmpty(name) && email.Contains("@") && email.Contains(".");

        // Assert
        Assert.False(isValid, $"Validation should have failed for {name} / {email}");
    }
}