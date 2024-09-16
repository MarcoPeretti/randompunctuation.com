import type { Metadata } from 'next';
import Link from 'next/link'
import eku from 'public/images/eku.jpg';
import Image from 'next/image';
import Socials from 'app/components/socials' 

export const metadata: Metadata = {
  title: 'UACGuard',
  description:
    "UAC Guard is a research project that aims to prevent known forms of code injections and Local Privilege Elevation.",
  keywords:
    "Marco Peretti, Kernel, LPE, UAC, Windows"
};


export default function UACGuardPage() {
  return (
    <section>
       <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        UAC Guard
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        UAC is not a security boundary and has inherent limitations as well as good number of known and unpatched exploits. We recommend configuring your users‘ accounts to run as standard users or using a Privilege Management solution. If that is not possible, UAG Guard may be of help.
      <br></br>
      <p>
        UAC Guard is a research project that aims to prevent all known forms of code injections and - ehm - Local Privilege Elevation. The default policy protects all Windows inbox executables from sideloading non-Windows DLLs. A Windows binary, in this context, is a signed file whose certificate contains specific Enhanced Key Usage values.
      </p>
      <h3 id="background">Background</h3>
      <p>
        Sophisticated malware families typically employ a combination of techniques to achieve their objectives. In this context, we will focus on Execution and Privilege Escalation, on Windows. 
      </p>
        A common technique to evade detection involves injecting and executing code into legitimate processes, typically writing to a process’s memory and/or causing it to load a malicious DLL.   
      <p>
        The primary targets are operating system files, as they are guaranteed to be present on the victim’s endpoint. 
      </p>
      In recent versions of Windows, every single(*) file that is shipped as part of the operating system is digitally signed. Therefore, there should be no reasons for a Windows executable to load an untrusted DLL - **ever**. 
      <p>
        This should not need something that needs to be "detected". It should be enforced by the OS by default. 
      </p>
      Process Mitigation Policies to control <a href="https://learn.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-process_mitigation_image_load_policy" target="_blank">Image Loading</a> and <a href="https://learn.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-process_mitigation_binary_signature_policy" target="_blank">Binary Signature</a> can be applied to mitigate some of these techniques. 
      The main limitation is that Binary Image policies apply generically to "Microsoft" code and they cannot be customized nor extended to other vendors. Process Mitigation Policies also require you to identify all operating system files and write policies for all of them.

      <h3 id="uacguard">UAC Guard</h3>
      <p>
        UAC Guard protects all Windows executables by preventing them from loading non-Windows DLLs. It consists of a kernel driver that intercepts both process creation and DLLs loading and checks their characteristics. In this context, Windows executable/DLL means a digitally signed binary file that is shipped as part of the operating system with specific Enhanced Key Attributes included in its certificate(s) as shown below.
      </p>
      <div className="columns-1 sm:columns-1 gap-4 my-4">
        <div className="relative w-full mb-4">
          <Image
            alt="Enhanced Key Attributes image"
            src={eku}
            height={762}
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>


      UAC presents a challenge, as if one can easily gain Adinistrative privileges, it's game over. It is thus important to prevent the execution of known UAC bypasses to make this solution effective.  

      <h3 id="features">Features</h3>
      <ul>
        <li>Single Policy: Audit or Enabled</li>
        <li>Restricts Windows executable to only loading Windows and Microsoft DLLs</li>
        <li>Prevents non-Windows processes from writing to Windows processes' memory</li>
        <li>Blocks known UAC Privilege Escalation attempts</li>
        <li>Prevent Process Hollowing, Doppelgaenging, Herpaderping, etc.</li>
      </ul>

      <h3 id="poc">Proof of Concept</h3>
      <p>
        The POC is a self-contained kernel driver for Windows 10+. 
      </p>
      The driver leverages Code Integrity and caches information on NTFS, inaccessible to user mode applications. 
      <p>
        The POC takes also into account security solutions that might inject their own DLL(s) into user mode processes. This is accomplsihed by a simple certificate white-list. The mechanism can be easily extended to cover applications such as Office, Acrobat Reader, etc.
      </p>

      <h3 id="why">Why</h3>
        I believe that there is the need for better OS "defaults" to reduce the attack surface area. These safe default are effective in disrupting common attack patterns that often precede ransomware deployment. 
      <br></br>
      <p>Possible extensions:</p>
      <ul>
        <li>Support for popular applications like Office and Acrobat Reader</li>
        <li>Support for a generic policy</li>
        <li>Prevent Microsoft scripting DLLs from being loaded into other applications</li>
        <li>Prevent loading of <a href="https://www.loldrivers.io" target="_blank">lol drivers</a></li>
        <li>Prevent <a href="https://lolbas-project.github.io" target="_blank">lol bins</a> from gaining administative privileges</li>
        <li>etc.</li>
      </ul>
      <br></br>
      (*) With the exception of <a href="https://learn.microsoft.com/en-us/dotnet/framework/tools/ngen-exe-native-image-generator" target="_blank">Native Images</a>.

      </div>
    </section>
  )
}