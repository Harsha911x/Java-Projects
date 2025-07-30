package com.example.JobAppV2;


import com.example.JobAppV2.model.JobPost;
import com.example.JobAppV2.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@Controller
@RestController
public class JobRestController {

    @Autowired
    private JobService service;

    @GetMapping({"/","jobs"})
    //@ResponseBody
    public List<JobPost> getAllJobs(){
      return service.getAllJobs();
    }

    // GET /jobs/{id} — Get job by ID
    @GetMapping("/jobs/{id}")
    public JobPost getJobById(@PathVariable int id) {
        return service.getJobById(id);
    }

    // POST /jobs — Create a new job
    @PostMapping("/jobs")
    public JobPost createJob(@RequestBody JobPost jobData) {
        service.addJob(jobData);
        return jobData;
    }

    // PUT /jobs/{id} — Update a job
    @PutMapping("/jobs/{id}")
    public JobPost updateJob(@PathVariable int id, @RequestBody JobPost updatedJob) {
        return service.updateJob(id, updatedJob);
    }

    // DELETE /jobs/{id} — Delete a job
    @DeleteMapping("/jobs/{id}")
    public void deleteJob(@PathVariable int id) {
        System.out.println("deleted");
        service.deleteJob(id);
    }




}
