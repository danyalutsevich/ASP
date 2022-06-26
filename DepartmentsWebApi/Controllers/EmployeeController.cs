﻿using DepartmentsWebApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DepartmentsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public EmployeeController(IConfiguration configuration)
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
                using (SqlCommand command = new SqlCommand("SELECT * FROM Employee", connection))
                {
                    var reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("ASP")))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("INSERT INTO Employee VALUES (@Name,@Dep,@DateOfJoining,@PhotoFileName)", connection))
                {

                    command.Parameters.AddWithValue("@Name", emp.Name);
                    command.Parameters.AddWithValue("@Dep", emp.Department);
                    command.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    command.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);

                    command.ExecuteNonQuery();

                }
            }

            return new JsonResult("Added");
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("ASP")))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("UPDATE Employee SET Name = @Name, Department = @Dep,DateOfJoining = @DateOfJoining, PhotoFileName = @PhotoFileName WHERE Id = @Id", connection))
                {

                    command.Parameters.AddWithValue("@Name", emp.Name);
                    command.Parameters.AddWithValue("@Dep", emp.Department);
                    command.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    command.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);
                    command.Parameters.AddWithValue("@Id", emp.Id);
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
                using (SqlCommand command = new SqlCommand("DELETE FROM Employee WHERE Id = @Id", connection))
                {

                    command.Parameters.AddWithValue("@Id",id);
                    command.ExecuteNonQuery();
                }
            }
            return new JsonResult("Deleted");
        }
    

    }
}
