import chainSpec from './westend2.json';
import * as smoldot from 'smoldot';

window.WebSocket = class extends WebSocket {
  constructor(...args) {
    console.log('will connect', ...args);
    super(...args);
  }
};

const client = smoldot.start({
  maxLogLevel: 9,
});
console.log('will add chain');
const chain = await client.addChain({ chainSpec: JSON.stringify(chainSpec) });

await new Promise((resolve) => setTimeout(resolve, 15_000));

console.log('will remove chain');
chain.remove();

// check websocket connections between these setTimeouts

await new Promise((resolve) => setTimeout(resolve, 60_000));

console.log('will terminate client');
client.terminate();
