# Top Cut Calculator - Chrome Extension for Limitless TCG

## About
Chrome extension designed to calculate tournament top cuts on the [Limitless TCG](https://play.limitlesstcg.com/tournament) platform.

## How to Install

<details>
<summary>Chrome</summary>

1. Download the extension:
   - Clone this repository or download as ZIP
   - Extract files if needed

2. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the extracted extension folder
</details>

<details>
<summary>Microsoft Edge</summary>

1. Download the extension:
   - Clone this repository or download as ZIP
   - Extract files if needed

2. Load in Edge:
   - Open Edge and go to `edge://extensions/`
   - Enable "Developer mode" in the left sidebar
   - Click "Load unpacked"
   - Select the extracted extension folder
</details>

<details>
<summary>Opera</summary>

1. Download the extension:
   - Clone this repository or download as ZIP
   - Extract files if needed

2. Load in Opera:
   - Open Opera and go to `opera://extensions`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the extracted extension folder
</details>

## How to Use
1. Open a tournament link on Limitless TCG 
   - The extension will use this page to get the total number of players

2. The extension automatically:
   - Gets the total number of players
   - Calculates Swiss rounds based on player count
   - Determines top cut size and percentage
   - Shows qualification chances for each record

## Settings
⚠️ **Note: Settings page is currently under development and not functional yet.**

The extension will allow customizing tournament rules through the settings page:

<details>
<summary>Access Settings</summary>

- Click the settings button (⚙️) on the extension
- A new settings page will open
</details>

<details>
<summary>Planned Features</summary>

- Edit existing rules
- Add new rules
- Remove rules
- Save changes locally
- Restore default settings
</details>

## Default Rules
| Players | Swiss Rounds | Top Cut |
|---------|--------------|---------|
| 4-8     | 3           | None    |
| 9-16    | 4           | Top 4   |
| 17-32   | 6           | Top 8   |
| 33-64   | 7           | Top 8   |
| 65-128  | 6           | Top 16  |
| 129-256 | 7           | Top 16  |
| 257-512 | 8           | Top 16  |
| 513-1024| 9           | Top 32* |
| 1025-2048| 10         | Top 32* |
| 2049+   | 10          | Top 64* |

## Results
- Calculator shows:
  - Top cut size with percentage
  - Required records with qualification chances
- Values are automatically detected from the tournament page

## Important Notes
⚠️ This calculator:
- Considers all registered players, including drops
- Currently uses fixed default rules (settings customization coming soon)
- Automatically adapts to browser language settings

## Future Updates
The following features are planned:
- Complete settings customization
- Local storage for custom rules

## Features
- Automatic language detection (English/Portuguese)
- Calculations based on tournament data
- Material Design UI with dark theme
