# DotCode Task

## Overview

This project is a web application for managing workspaces and financial transactions. It allows users to organize, view, and manage data about workspaces and transactions through an intuitive interface. The project is built using modern frontend technologies and has a simple structure for ease of use and future expansion.

---

## Technologies Used

- **Next.js** — React framework for server-side rendering and static site generation.
- **React 19** — Library for building user interfaces.
- **Tailwind CSS** — Utility-first CSS framework for rapid UI development.
- **@radix-ui/themes** — Ready-made styled components and themes for React.
- **react-rnd** and **react-draggable** — Libraries for drag-and-drop and resizable UI elements.

---

## Workspace Page

The **Workspace** page provides an interactive area where users can manage multiple draggable and resizable blocks. Each block represents an individual workspace element with configurable position, size, and visibility. The layout and state of these blocks are persisted locally, so users find their workspace as they left it after page reloads.

Key features include:

- **Drag and Resize:** Users can move and resize blocks freely within a grid snapping every 10 pixels.
- **Layer Management:** Clicking or dragging a block brings it to the front by increasing its z-index, enabling easy layering.
- **Visibility Toggle:** Blocks can be “deleted” by hiding them (visibility toggled off) without permanent removal.
- **State Persistence:** Positions, sizes, and visibility of blocks are saved locally and restored on page load.
- **Reset Function:** A reset button restores all blocks to their default positions, sizes, and visibility.
- **Loading State:** While loading persisted data, skeleton placeholders are shown to improve user experience.

---

## Transactions Page

The **Transactions** page is a real-time Bitcoin transaction tracker that connects to the Blockchain.info WebSocket API to receive live updates on unconfirmed transactions.

Key features include:

- **Live Updates:** The page subscribes to a WebSocket feed to receive real-time transaction data.
- **Transaction List:** Displays a table of incoming Bitcoin transactions showing transaction hash, sender address, receiver address, and the amount in BTC.
- **Control Buttons:** Users can start or stop the live feed and reset the transaction list at any time.
- **Total Sum:** Shows the cumulative total amount of Bitcoin received from all tracked transactions during the current session.
- **Responsive UI:** Built with Radix UI components and styled with Tailwind CSS for a clean, accessible interface.

---

## Live Version

You can check out the live version of the project deployed on Vercel:

[View Live Version](https://dotcode-task-eta.vercel.app/)

---

## Running the Project Locally

### Requirements

- Node.js (recommended version 16+)
- npm or yarn

### Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/mmaryblackk/dotcode-task.git
   cd dotcode-task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

If you need any additional sections or detailed instructions, feel free to ask!
