import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to',
  description:
    "More about myself",
};

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        About
      </h1>

      <div className="prose prose-neutral dark:prose-invert">

        <p>
          Brief background about myself, my strengths and my flaws. 
        </p>

        <h3 id="bio">Super Short Bio</h3>
        Held Executive, Engineering and Product Management roles in fast-growing companies, often during hyper-growth phases. Led multicultural and distributed development teams and shipped successful products, deployed to millions of endpoints, or serving many tens of millions of users (SaaS).
        
        <h3 className="mt-8" id="career">Career Highlights</h3>

        <ul>
          <li>Held executive positions in both large organizations and high-growth scale-ups.</li>
          <li>Invented and brought to market several innovative endpoint security solutions, deployed to millions of endpoints on many fortune 100 organizations.</li>
          <li>CTO of a SaaS organization handling 40M+ unique monthly users (Web, Android, iOS).</li>
          <li>Founded a number of startups, raised capital, and grew two of them to 40+ employees.</li>
          <li>4 Exits: SecureWave, NeoValens, BeyondTrust, and Avecto.</li>
        </ul>

        <h4>
        <p className="prose prose-neutral dark:prose-invert">
          I am approaching the end of my sabbatical and eager to join like-minded people and work on ambitious projects. Feel free to get in touch to discuss potential opportunities.
        </p>
        </h4>

        <h3 className="mt-8" id="flaws">Flaws</h3>
        Transparency and directness are part of the values I live for. The main flaws are listed below for two main reasons.
        The first one is for people to be aware of them so that they know it's not them but my fault. 
        The second one is so that I can improve. 

        <ul>
          <li>In meetings I may look serious. This is usually because I am usually very focused and paying attention, often in a foreign language. It is OK to remind me to &lsquo;smile more&rsquo; .</li>
          <li>I may sometimes struggle to patiently listen and will propose a &lsquo;solution&rsquo;. This is usually because I am either in a rush or just happen to have an idea.</li>
          <li>I don't particularly enjoy <em>lengthy</em> discussions on topics I happen to have invested a considerable amount of time researcing with people that have <em>strong opinions</em>, but cannot be bothered to invest time to also learn at least the basics of the subject being discussed.</li>
          <li>I sometimes answer email/messages after working-hours or on weekends. </li>
         </ul>

        <h3 className="mt-8" id="strengths">Strengths</h3>

        <ul>
          <li>We can discuss any subject. I often have &lsquo;strong opinions, weakly held&rsquo; and have no problem changing my mind if the reasons and logic are sound.</li>
          <li>I love learning. I enjoy working on complex problems where we can collectively work toward a solution.</li>
          <li>My priorities are the company I work for, my team(s), myself - in this order.</li>
          <li>I openly admit when I am wrong. I take ownership of my decisions.</li>
          <li>I deeply care about the well-being of the people that work with me.</li>
          <li>I vaue and appreciate feedback.</li>
          <li>I praise in public, and discuss issues in private.</li>
         </ul>

         <h3 className="mt-8" id="howto">How to work with me</h3>

         <ul>
          <li>Come prepared to meetings. </li>
          <li>I cannot fix what I am not aware of. When in doubt, talk to me.</li>
          <li>I treat people with respect, and I expect the same in return. Not because of authority, just basic human decency.</li>
          <li>Don&lsquo;t make me chase you for stuff we agreed. Once you commit to something, it is your responsiblity to drive it forward and keep me updated. The same applies to me, of course.</li>
         </ul>

         <h3 className="mt-8" id="name">Random Punctuation</h3>
          <p>
            The name <b>randompunctuation.com</b> comes from a comment a former colleague made many years ago while reviewing an article I wrote. He basically told me that it seemed I randomly added punctuation marks and it made the text harder to read. 
            He was right, and the name stuck.
          </p>
          <p>
            English is not my mother tongue and I am also dyslexic. Writing well is indeed a challenge despite the availability of spelling and grammar checkers. 
            I was told that the best way to improve is to write, and therefore this blog.
            Feedback is welcome.  
          </p>
          <p>
          The idea about the Flaws and Strengths sections comes from Gitlab&lsquo;s CEO own&nbsp;  
          <a href="https://handbook.gitlab.com/handbook/ceo/" target="_blank">page</a> 
          . His introduction to Flaws resonated well with me, and I decided to keep it pretty much the same.
          </p>

          <h3 className="mt-8" id="personal">Personal</h3>
          <p className="prose prose-neutral dark:prose-invert">
            I ride motocross and speed bikes on racetracks, and am also a keen sports photographer.  I have published some my best shots&nbsp;  
            <a href="https://marco101mx.myportfolio.com/" target="_blank">here</a>
          </p>
          <p className="prose prose-neutral dark:prose-invert">
            I have also started another low-profile blog, where I write about little experiments, such as setting up Ghost on a Raspberry PI, Cloudflare Tunnels and similar stuff.   
            If interested, you can find it at&nbsp; 
            <a href="https://marcoperetti.com/" target="_blank">marcoperetti.com</a>
          </p>

          <h3 className="mt-8" id="template">Blog template</h3>
          <p>
            This web site is based on Lee&lsquo;s Robison&nbsp; 
            <a href="https://github.com/leerob/leerob.io" target="_blank">template</a> 
            &nbsp; and is running on Vercel. This allows me to keep up to date with with Next.js, Typescript, Tailwind CSS, and Markdown 
          </p>
          <h3 className="mt-8" id="contact">Get in touch</h3>
          </div>

         <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/perettimarco"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">Twitter/X</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/marcoperetti/"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">LinkedIn</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/marcoperetti"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">GitHub</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.instagram.com/marco101mx/"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">Instagram</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
