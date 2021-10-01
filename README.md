<p align="center">
<img src="https://user-images.githubusercontent.com/72305598/134335664-bd03cc36-3a0a-473c-8925-a929939c2d61.png" />
</p>

## About

⚠️ WORK IN PROGRESS ⚠️

Interpretation of the classic game Battleship

## Setup

```bash
# Install dependencies
npm install

# Terminal 1: Run development server for frontend
npm run dev

# Terminal 2: Run backend server
npm run server
```

## Todo

- [x] Basic UI
- [x] Move ships
- [x] Rotate ships
- [x] Place ships in new positions
- [x] Handle invalid placements of ships (adjacent of other ships, out of bounds)
- [x] Disable board when ready
- [x] Backend: set up Server Sent Events (SSE)
- [x] Backend: handle connection on ready
- [x] Backend: share board information on connection
- [x] Disable opponent's board before being ready and connected
- [x] Backend: handle actions and turns
- [x] Turn based available and disabled actions
- [ ] Handle win/loss

## Nice to have

- [ ] User can connect and play against another user with a specific access code
- [ ] User name input
- [ ] Play against AI

## Screenshot

![](https://user-images.githubusercontent.com/72305598/134332612-5a41eb0b-7f5d-4eff-ad46-f0a507f1b6f6.png)
