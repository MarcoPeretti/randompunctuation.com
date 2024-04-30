import type { Metadata } from 'next';
import Link from 'next/link'
import v4 from 'public/images/v4-blue-1024.png';
import Image from 'next/image';
import Socials from 'app/components/socials' 

export const metadata: Metadata = {
  title: 'About',
  description:
    "A few words about myself, my flaws, my strengths and how how to work with me. May be useful if you plan on hiring me.",
  keywords:
    "Marco Peretti, Engineering Executive, Scaling Engineering Teams, Engineering Management, Cybersecurity"
};


export default function AboutPage() {
  return (
    <section>

      <div className="columns-1 sm:columns-1 gap-4 my-4">
        <div className="relative w-full aspect-video mb-4">
          <Image
            alt="Racing"
            src={v4}
            fill
            sizes="(max-width: 1024px) 100vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        About
      </h1>

      <div className="prose prose-neutral dark:prose-invert">

        <p>
          Brief background about myself. A brief summary of my professional accomplishments can be found <Link href="/work">here</Link>
        </p>

        <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
          <div className="flex items-center w-4 mr-4">💡</div>
          <div className="w-full callout">I am approaching the end of my sabbatical and eager to join like-minded people and work on ambitious projects. I am ideally looking for full-time positions but am currently also available for short-term consulting missions:

          <ul>
            <li>Fractional CTO or mentoring roles</li>
            <li>Scaling Engineering Teams</li>
            <li>Artifical Intelligence and implications for business strategies</li>
        </ul>
          
          Feel free to get in touch to discuss potential opportunities.</div>
      </div>

         <h3 className="mt-8" id="name">Random Punctuation</h3>
          <p>
            The name <b>randompunctuation.com</b> comes from a comment a former colleague made many years ago while reviewing an article I wrote. He basically told me that it seemed I randomly added punctuation marks and it made the text harder to read. 
            He was right, and the name stuck.
          </p>
          <p>
            English is not my mother tongue and I am also a littlb eit dyslexic (that's a joke, btw). Writing well is indeed a challenge despite the availability of spelling and grammar checkers. 
            I was told that the best way to improve is to write, and therefore this blog.
            Feedback is welcome.  
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

          <Socials/>
       
    </section>
  );
}
