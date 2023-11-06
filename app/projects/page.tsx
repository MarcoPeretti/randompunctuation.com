import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Research projects",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        Recent Projects
      </h1>

        <div className="prose prose-neutral dark:prose-invert">

          I learn by doing, which means I am usually working on some side project. 
        <br></br>
        <p>
          This page complements information on my CV, and covers recent side/research projects that I have worked on during the past 3/4 years.   
        </p>
        <p>
          I am familiar with both Azure and AWS, and have used them pretty much since the beginning. In terms of programming languages, I tend to use mostly C# and C++, but have reasonable knowledge of both Python and Typescript. 
          On the frontend, I tend to use Nextjs, Tailwind CSS. 
        </p>
        
        <h3 id="uacguard">DLLs side-loading and local privilege escalation protection</h3>
        
          I wrote a Windows Kernel Driver to restrict Microsoft inbox executables to only load Microsoft signed DLLs and extended it to block a good number of known UAC exploits.  More information&nbsp;  
        <a href="https://uacguard.com/about" target="_blank"> here</a>
   
        <h3 id="crash">Crash Analysis as a Service</h3>

          Here I looked into automating crash dumps collections and analysis. The backend is written in C# and runs on Windows Azure. The Crash Analysis engine is written in C++ and running in a Docker image. The frontend was a simple website deployed to Vercel.

        <br></br>
        <p>
          <b>Stack: </b>Azure Container Registry, Azure Container Instances, API Management Service, Function Apps, Logic Apps, Storage Accounts, DNS Zone, Key Vault, Send Grid, Front Door CDN, Application Insights, Service Bus, Azure Cosmos DB
        </p>

        <h3 id="battery">Applications' Battery Usage</h3>

          This research project aimed at centralizing applications’ battery usage as well as ways to reduce their consumptions and thus extend battery life. The Windows client is written in C++ and a mix of Go and Javascript on the backend. The frontend was a static website deployed to CloudFront.  
	
        <br></br>
        <p>
          <b>Stack: </b>AWS Athena, Glue, S3, Lambda, SQS, CloudFront, Route 53, AWS Amplify, Dynamo DB, SimpleDB, AWS Timestream, AWS SDK for C++
        </p>

        <h3 id="ransomware">Ransomware protection</h3>

        This is an older project dating back to 2017 where I developed a Windows kernel driver PoC that calculated the entropy of each file as it was written to disk and rejected the ones over a given threshold. 
        <br></br>
        
        <h3 id="survey">Developers' Survey</h3>
          <p>
            I am interested in Developers’ Experience (DevEx), so I developed a survey application to collect key insights into the challenges that development teams face. 
        
            Questions were derived from DevOps Research and Assessment <a href="https://dora.dev/" target="_blank"> (DORA)</a>, The <a href="https://queue.acm.org/detail.cfm?id=3454124" target="_blank"> Space Framework</a>, and other sources.          
          </p>
          <p>
            <b>Stack: </b>NextJs/React, Typescript, Tailwind CSS, NextAuth.js, Plantescale, SurveyJS, Vercel
          </p>

        <h3 id="source">Source code</h3>
          <p>
            I rarely release source code as I don’t really plan to maintain these projects and, to be honest, the quality of the code is often so-so. They are useful to me to experiment and learn new concepts.  
          </p>
        </div>

    </section>
      );
    }