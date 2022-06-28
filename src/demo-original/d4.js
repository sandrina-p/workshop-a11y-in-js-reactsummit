/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { css } from 'styled-components/macro';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import {
  fakeWaitTime,
  shuffleDays
  //  usePrefersReducedMotion
} from '../utils';
import { FormSample } from '../components/Form';
import {
  Case,
  Stack,
  TitleDivider,
  modalCSS,
  textMonoCSS,
  rotateCSS
} from '../components/Layout';
import imgCatRest from '../assets/cat_rest.jpg';
import imgCatSearching from '../assets/cat_searching.jpg';
import imgCatStairing from '../assets/cat_stairing.jpg';
import { buttonOutlineCSS, linkCSS } from '../components/Button';

export default function Demo4() {
  return (
    <section>
      <TitleDivider>#4 Extra time?</TitleDivider>
      <Stack dir="column" gap="50px">
        <CaseCustomInterfaces />
        <CaseGeneratedData />
        <CaseAnimations />
      </Stack>
    </section>
  );
}

function CaseGeneratedData() {
  const cats = [
    {
      url: imgCatRest,
      name: 'Tokio'
    },
    {
      url: imgCatSearching,
      name: 'Oscar'
    },
    {
      url: imgCatStairing,
      name: 'Luna'
    }
  ];
  return (
    <Case title="Generated data" refs={refs.btnVsLink}>
      <h4>My cute cats</h4>
      <Stack>
        <ul css={listCatsCSS.ul}>
          {cats.map(({ url, name }, i) => (
            <li key={i}>
              <img src={url} alt={`Cat ${name}`} />
              <div css={listCatsCSS.info}>
                <span>{name}</span>
                <a href={`#cat-link/${i}`} css={linkCSS}>
                  View
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Stack>
    </Case>
  );
}

// =================

function CaseCustomInterfaces() {
  const [isOpenBroken, setIsOpenBroken] = useState(false);
  const [isOpenA11Y, setIsOpenA11Y] = useState(false);

  return (
    <Case title="Custom Interfaces" refs={refs.customInterfaces}>
      <div>
        <Stack>
          <button onClick={() => setIsOpenBroken(true)} css={buttonOutlineCSS}>
            Open modal (broken)
          </button>

          <button onClick={() => setIsOpenA11Y(true)} css={buttonOutlineCSS}>
            Open modal (accessible)
          </button>
        </Stack>

        <div>
          <div css={modalCSS} data-open={isOpenBroken}>
            <div>
              <p>This modal is not accessible.</p>
              <FormSample />
              <button onClick={() => setIsOpenBroken(false)}>Close</button>
            </div>
          </div>

          {/* 💡 Creating an accessible modal is harder than it looks like.
          Consider using custom components from the community */}
          <Dialog
            isOpen={isOpenA11Y}
            onDismiss={() => setIsOpenA11Y(false)}
            aria-label="Sample Modal"
          >
            <p>
              This modal is accessible with <code>"@reach/dialog"</code>.
            </p>
            <FormSample />
            <button onClick={() => setIsOpenA11Y(false)}>Close</button>
          </Dialog>
        </div>
      </div>
    </Case>
  );
}

// =================

// 💡 How to toggle motion in your OS:
// - In macOS: System Preferences > Accessibility > Display > Reduce motion.
// - In Windows 10: Settings > Ease of Access > Display > Show animations in Windows.

function CaseAnimations() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState('');

  async function revealNumber() {
    setText('');
    setIsLoading(true);

    // 💡 How can we avoid motion created by JavaScript?
    const stopShuffle = shuffleDays(setText);
    await fakeWaitTime(1500);
    stopShuffle();

    setIsLoading(false);
    setText("It's Friday!");
  }

  return (
    <Case title="Animations personalized" refs={refs.motion}>
      <div css={rotateCSS}></div>
      <Stack>
        <button onClick={revealNumber}>Reavel lucky week day</button>
        <button onClick={() => setText('')}>Reset</button>
      </Stack>
      <br />
      {isLoading && (
        <p aria-live="assertive" className="sr-only">
          Loading...
        </p>
      )}
      <p css={textMonoCSS}>{text}</p>
    </Case>
  );
}

// =================

var refs = {
  customInterfaces: [
    {
      name: 'Dialog A11Y considerations',
      url: 'https://github.com/KittyGiraudel/react-a11y-dialog/issues/58'
    },
    {
      name: 'Claims vs Reality in A11Y packages',
      url:
        'https://hidde.blog/accessible-front-end-components-claims-vs-reality/'
    }
  ],
  motion: [
    {
      name: 'no-motion-first approach',
      url: 'https://www.tatianamac.com/posts/prefers-reduced-motion/'
    },
    {
      name: 'usePrefersReducedMotion hook',
      url:
        'https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/'
    }
  ]
};

// =============
// Unrelevant CSS for this exercise

var listCatsCSS = {
  ul: css`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 24px;

    li {
      flex-basis: 33%;
    }
  `,
  info: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `
};
