import './theme.scss';
import styled from 'styled-components/macro';
import { Hero, Footer } from './components/Layout';
import DemoOriginal from './demo-original';
// import DemoSolutions from './demo-solutions';

const Content = styled.div`
  max-width: 460px;
  margin: auto;
`;

export default function App() {
  return (
    <div>
      <main>
        <Hero>
          <h1>Web Accessibility in JavaScript Apps</h1>
          <p>
            Scenarios where JS can improve (or damage) A11Y of your website.
          </p>
        </Hero>

        <Content>
          <DemoOriginal />
          <br />
          <br />
          {/* 💡 In case you want to pick a possible solution */}
          {/* <DemoSolutions /> */}
        </Content>
      </main>
      <Footer />
    </div>
  );
}
