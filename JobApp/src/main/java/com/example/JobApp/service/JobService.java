package com.example.JobApp.service;

import com.example.JobApp.model.JobPost;
import com.example.JobApp.repo.JobRepo;
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


}
