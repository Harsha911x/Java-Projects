package com.example.JobAppV2.service;

import com.example.JobAppV2.model.JobPost;
import com.example.JobAppV2.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class JobService {

    @Autowired
    private JobRepo service;

    public void addJob(JobPost jobPost){
        service.addJob(jobPost);

    }

    public List<JobPost> getAllJobs(){

        return service.getAllJobs();
    }

    public JobPost getJobById(int id){
        return service.getJobById(id);
    }


    public JobPost updateJob(int id, JobPost updatedJob) {

        return service.updateJob(id, updatedJob);
    }

    public void deleteJob(int id) {
        service.deleteJob(id);
    }
}
