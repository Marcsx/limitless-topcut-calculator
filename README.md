# Top Cut Calculator - Chrome Extension for Limitless TCG

## About
Chrome extension designed to calculate tournament top cuts on the [Limitless TCG](https://play.limitlesstcg.com/tournament) platform.

## How to Use
1. Open a tournament link on Limitless TCG 
   - The extension will use this page to get the total number of players

2. The extension automatically:
   - Gets the total number of players
   - Calculates Swiss rounds based on player count
   - Determines top cut size

## Settings
⚠️ **Note: Settings page is currently under development and not functional yet.**

The extension will allow customizing tournament rules through the settings page:

1. **Access Settings**
   - Click the settings button (⚙️) on the extension
   - A new settings page will open

2. **Planned Features**
   - Edit existing rules
   - Add new rules
   - Remove rules
   - Save changes locally
   - Restore default settings

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
- Calculator shows values based on default rules
- Values are automatically detected from the tournament page

## Important Notes
⚠️ This calculator:
- Considers all registered players, including drops
- Currently uses fixed default rules (settings customization coming soon)
- Uses Material Design with dark theme

## Future Updates
The following features are planned:
- Complete settings customization
- Local storage for custom rules
- Rule set management for different tournament types
- Language settings (English/Portuguese)
