/* eslint-disable jsx-a11y/anchor-is-valid */

import { Case, Stack, TitleDivider } from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button, buttonCSS, linkCSS } from '../components/Button';
import styled from 'styled-components/macro';

export default function Demo1() {
  return (
    <section>
      <TitleDivider>#1 Routing</TitleDivider>
      <Stack dir="column" gap="50px">
        <CaseLinks />
        <CaseButtons />
      </Stack>
    </section>
  );
}

function CaseLinks() {
  let navigate = useNavigate(); // In Routerv5 it's useHistory()

  return (
    <Case title="Clicks that look like links" refs={refs.btnVsLink}>
      <Stack>
        <button onClick={() => navigate(`destiny`)} css={linkCSS}>
          Get Started A
        </button>

        <Link to="/destiny" css={linkCSS}>
          Get Started B
        </Link>

        <a href="#" onClick={() => alert('Modal open!')} css={linkCSS}>
          Get Started C
        </a>
      </Stack>
    </Case>
  );
}

const LinkAsButton = styled(Link)`
  ${buttonCSS}
`;

function CaseButtons() {
  return (
    <Case title="Clicks that look like buttons" refs={refs.btnAreLinks}>
      <Stack>
        <Link to="/destiny">
          <Button>Get Started A</Button>
        </Link>

        <LinkAsButton to="/destiny">Get Started B</LinkAsButton>

        <Button onClick={() => alert('Modal open!')}>Get Started C</Button>
      </Stack>
    </Case>
  );
}

var refs = {
  btnVsLink: [
    {
      name: 'Buttons vs Links',
      url: 'https://css-tricks.com/buttons-vs-links/'
    },
    {
      name: 'Accessible client routing',
      url:
        'https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/'
    }
  ],
  btnAreLinks: [
    {
      name: 'Using :focus-visible',
      url: 'https://css-tricks.com/the-focus-visible-trick/'
    },
    {
      name: 'Creating good focus indicators',
      url: 'https://www.sarasoueidan.com/blog/focus-indicators/'
    }
  ]
};
