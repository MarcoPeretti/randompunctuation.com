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

export default function Socials() {
    return (
        <div>
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
            </div>

    );
}