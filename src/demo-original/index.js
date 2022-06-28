import React from 'react';
import Demo1 from './d1';
import Demo2 from './d2';
import Demo3 from './d3';
import Demo4 from './d4';

import { Stack } from '../components/Layout';

export default function DemoShell() {
  return (
    <Stack dir="column" gap="120px">
      <Demo1 />
      <Demo2 />
      <Demo3 />
      <Demo4 />
    </Stack>
  );
}
