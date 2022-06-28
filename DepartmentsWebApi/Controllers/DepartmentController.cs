using DepartmentsWebApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DepartmentsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public DepartmentController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();

            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("ASP")))
            {
                connection.Open();


                using (SqlCommand command = new SqlCommand("SELECT * FROM Departments ORDER BY 1", connection))
                {
                    var reader = command.ExecuteReader();

                    table.Load(reader);

                    reader.Close();
                }


            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Department depName)
        {

            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("ASP")))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("INSERT INTO Departments VALUES (@depName)", connection))
                {
                    command.Parameters.AddWithValue("@depName", depName.Name);
                    command.ExecuteScalar();
                }

            }
            return new JsonResult("Added");
        }

        [HttpPut]
        public JsonResult Put(Department dep)
        {

            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("ASP")))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("UPDATE Departments SET Name = @DepName WHERE Id = @DepId", connection))
                {
                    command.Parameters.AddWithValue("@DepId", dep.Id);
                    command.Parameters.AddWithValue("@DepName", dep.Name);
                    command.ExecuteNonQuery();
                }
            }

            return new JsonResult("Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("ASP")))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("DELETE FROM Departments WHERE Id = @DepId", connection))
                {
                    command.Parameters.AddWithValue("@DepId",id);
                    command.ExecuteScalar();
                }

            }

            return new JsonResult("Deleted");

        }

    }
}
