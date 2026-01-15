using Portfolio.Backend.Models;
using Xunit;

namespace Portfolio.Backend.Tests
{
    public class ContactRequestTests
    {
        [Fact]
        public void ContactRequest_ShouldStoreDataCorrectly()
        {
            // Arrange
            var request = new ContactRequest 
            { 
                Name = "Tarek", 
                Email = "test@example.com", 
                Message = "Hello World" 
            };

            // Assert
            Assert.Equal("Tarek", request.Name);
            Assert.Equal("test@example.com", request.Email);
        }
    }
}