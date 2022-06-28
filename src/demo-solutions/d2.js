/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Case, Stack, TitleDivider, IconHeart } from '../components/Layout';
import { Button, buttonToggleCSS } from '../components/Button';
import { css } from 'styled-components/macro';

export default function Demo2() {
  return (
    <section>
      <TitleDivider>#2 Toggleable interfaces</TitleDivider>
      <Stack dir="column" gap="50px">
        <CaseToggleButtons />

        <CaseCollapsingContent />

        <CaseDetailsEl />
      </Stack>
    </section>
  );
}

// ===============

function CaseToggleButtons() {
  const [isActiveA, setIsActiveA] = React.useState(false);
  const [isActiveB, setIsActiveB] = React.useState(false);

  return (
    <Case title="Toggle button" refs={refs.toggleStates}>
      <Stack>
        <button
          onClick={() => setIsActiveA((status) => !status)}
          data-active={isActiveA}
          // 💡 Tell Screen Readers if the button is active or not.
          aria-pressed={isActiveA}
          css={buttonToggleCSS}
        >
          Like
          <IconHeart />
        </button>

        <button
          onClick={() => setIsActiveB((status) => !status)}
          data-active={isActiveB}
          aria-pressed={isActiveA}
          css={buttonToggleCSS}
        >
          <IconHeart />
          {/* 💡 Tell SR what's the button name. */}
          <span className="sr-only">Like</span>
        </button>
      </Stack>
    </Case>
  );
}

// ===============

function CaseCollapsingContent() {
  return (
    <Case title="Collapsed content" refs={refs.hiding}>
      <ActionsBroken />
      <ActionsUsingVisibility />
      <ActionsUsingInert />
    </Case>
  );
}

const actionsListCSS = css`
  position: absolute;
  top: 0.4rem;
  left: 100%;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  transition: clip-path 150ms ease-in;

  &[data-open='true'] {
    transition: clip-path 200ms ease-out;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

function ActionsBroken() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <>
      <p>Not accessible </p>
      <div css={actionsContainerCSS}>
        <Button onClick={toggleActionsOpen}>Actions</Button>
        <nav css={actionsListCSS} data-open={isActionsOpen}>
          <ActionsItems />
        </nav>
      </div>
    </>
  );
}

const actionsListCSSSolution = css`
  ${actionsListCSS};

  /* 💡 Make the visibility change only after clip-path transition is finished (delay of 200ms */
  transition: clip-path 150ms ease-in, visibility 1ms 150ms;
  /* 💡 hide it from Assistive Technologies (ie. Keyboard, Screen Readers, etc...) */
  visibility: hidden;

  &[data-open='true'] {
    /* 💡 Make visible again  */
    visibility: visible;
    transition: clip-path 200ms ease-out;
  }
`;

function ActionsUsingVisibility() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>Accessible (using "visibility")</p>
      <nav css={actionsContainerCSS}>
        <Button
          onClick={toggleActionsOpen}
          // 💡 Tell the menu status (expanded vs collapsed)
          aria-expanded={isActionsOpen}
          // 💡 Allows SR to jump directly to the respective menu
          aria-controls="actionsWithVisibilitySolution"
        >
          Actions
        </Button>
        <div
          css={actionsListCSSSolution}
          data-open={isActionsOpen}
          id="actionsWithVisibilitySolution"
        >
          <ActionsItems />
        </div>
      </nav>
    </div>
  );
}

function ActionsUsingInert() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>Accessible (Using "inert")</p>
      <div css={actionsContainerCSS}>
        <Button
          onClick={toggleActionsOpen}
          aria-expanded={isActionsOpen}
          aria-controls="actionsWithInertSolution"
        >
          Actions
        </Button>
        <nav
          data-open={isActionsOpen}
          // 💡 You need to import inert polyfill at index.js
          // to work properly in every modern browser.
          inert={isActionsOpen ? null : 'true'}
          css={actionsListCSS}
          id="actionsWithInertSolution"
        >
          <ActionsItems />
        </nav>
      </div>
    </div>
  );
}

function ActionsItems() {
  return (
    <ul css={actionsUlCSS}>
      <li>
        <button>Copy</button>
      </li>
      <li>
        <button>Cut</button>
      </li>
      <li>
        <button>Edit</button>
      </li>
    </ul>
  );
}

// ===============

function CaseDetailsEl() {
  return (
    <Case title="Details element" refs={refs.detailsEl}>
      <details>
        <summary>What is &lt;details&gt; HTML element</summary>
        This HTML element creates a disclosure widget in which information is
        visible only when the widget is toggled into an "open" state. A summary
        or label must be provided using the &lt;summary&gt; element.
      </details>
    </Case>
  );
}

// ===============

var refs = {
  toggleStates: [
    {
      name: 'Rules of ARIA',
      url: 'https://w3c.github.io/using-aria/#notes2'
    },
    {
      name: 'Name, Role, Value',
      url:
        'https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=412#name-role-value'
    },
    {
      name: 'Playing with state',
      url: 'https://sarahmhigley.com/writing/playing-with-state/'
    }
  ],
  hiding: [
    {
      name: 'Hiding content responsibly',
      url: 'https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/'
    },
    {
      name: 'The inert attribute',
      url: 'https://developer.chrome.com/articles/inert/'
    }
  ],
  detailsEl: [
    {
      name: 'Animating Details',
      url:
        'https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/'
    },
    {
      name: 'Details are not accordions/menus/etc',
      url:
        'https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html'
    }
  ]
};

// =============
// Unrelevant CSS for this exercise

const actionsContainerCSS = css`
  position: relative;
  width: min-content;
  margin-bottom: 8px;
  --val: calc(100% + 2px); /*2px for focus shadow space */
`;

const actionsUlCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 4px;
  display: flex;
`;
