
import Socials from 'app/components/socials' 

export default async function Page() {
 
  return (
    <section>

    <div className="prose prose-neutral dark:prose-invert">

        <p>
          Brief summary of my main professional accomplishments and what to expect working with me. 
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

        <h3 id="learned">What I learned so far</h3>
        <ul>
          <li>As a Chief Technology Officer (CTO): Aligning company strategy to a technology roadmap, effectively communicating initiatives, fostering innovation, and ensuring optimal ISO 27001 compliance.</li>
          <li>As Head of Engineering: Implementing DevOps best practices, scaling teams, introducing and utilizing Agile methodologies, managing distributed teams, and ensuring Secure SDLC.</li>
          <li>As an Entrepreneur: Raising capital, closing enterprise sales, establishing stock options plans, managing complex contracts, creating subsidiaries and more.</li>
          <li>As a Technologist: Cloud Computing, Web Development, Cybersecurity, Systems Programming, Machine Learning</li>
          <li>As a Human being: empathy, giving and receiving feedback effectively, mentoring others, nurturing relationships, setting clear goals and expectations, managing conflicts, fostering consensus</li>
        </ul>

        <h3 className="mt-8" id="flawsandstengths">Flaws & Strengths</h3>
        <p>
          The idea about the Flaws and Strengths sections comes from Gitlab&lsquo;s CEO own&nbsp;  
          <a href="https://handbook.gitlab.com/handbook/ceo/" target="_blank">page</a> 
          . His introduction to Flaws resonated well with me, and I decided to keep it pretty much the same.
        </p>

        <h3 className="mt-8" id="flaws">Flaws</h3>
        Transparency and directness are part of the values I live for. The main flaws are listed below for two main reasons.
        The first one is for people to be aware of them so that they know it's not them but my fault. 
        The second one is so that I can improve. 

        <ul>
          <li>In meetings I may look serious. This is usually because I am usually very focused and paying attention, often in a foreign language. It is OK to remind me to &lsquo;smile more&rsquo; .</li>
          <li>I may sometimes struggle to patiently listen until the end and will propose a &lsquo;solution&rsquo;. I am problem solver by nature, and sometimes can act instinctively. </li>
          <li>I don't particularly enjoy <em>lengthy</em> discussions on topics I happen to have invested a considerable amount of time researcing with people that have <em>strong opinions</em>, but cannot be bothered to invest time to also learn at least the basics of the subject being discussed.</li>
          <li>I sometimes answer email/messages after working-hours or on weekends. </li>
         </ul>

        <h3 className="mt-8" id="strengths">Strengths</h3>

        <ul>
          <li>We can discuss any subject. I often have &lsquo;strong opinions, weakly held&rsquo; and have no problem changing my mind if the reasons and logic are sound.</li>
          <li>I love learning. I enjoy working on complex problems where we can collectively work toward a solution.</li>
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

        <h3 className="mt-8" id="contact">Get in touch</h3>

      </div>

      <Socials/>

      </section>

  );
}