🎨 Dynamic UI Editor
A powerful React-based UI editor that enables real-time customization of UI designs without writing code. Built with React, Vite, and Tailwind CSS, this tool provides an intuitive interface for designers and developers to dynamically adjust layouts, typography, colors, and more with instant live preview.

✨ Features
Core Functionality

🎨 Typography Control: Font family, weight, and size customization (10px-60px)
🔘 Button Styling: Border radius, shadow effects, alignment, and color customization
🖼️ Gallery Management: Grid/List layouts, spacing control, and image border radius
📐 Layout Customization: Card corner radius, container padding, and section backgrounds
🎯 Stroke/Border Control: Adjustable stroke color and weight
👁️ Live Preview: Real-time UI updates as you make changes
💾 Export Configuration: Download UI settings as JSON for future reuse
📋 Copy to Clipboard: Quick configuration sharing

Additional Features

Tabbed Interface: Organized controls for easy navigation
Responsive Design: Works seamlessly across different screen sizes
Intuitive Controls: Sliders, color pickers, and dropdown menus
Visual Feedback: Smooth transitions and hover effects
Layout Switching: Toggle between grid and list views


🚀 Getting Started
Prerequisites

Node.js (v14.0.0 or higher)
npm or yarn

Installation
Clone the repository
bash   git clone https://github.com/kaurbaban06/dynamic-ui-editor.git
cd dynamic-ui-editor

Install dependencies
bash   npm install
Start development server
bash   npm run dev
Open your browser
http://localhost:5173
Build for Production
bashnpm run build
The optimized build will be in the dist/ directory.

🏗️ Project Structure
dynamic-ui-editor/
├── src/
│   ├── App.jsx           # Main component with editor and preview
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and Tailwind directives
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── README.md            # Project documentation

🎯 Component API
Configuration Object Structure
The editor uses a centralized configuration object to manage all UI customizations:
javascript{
  typography: {
    fontFamily: string,    // Font family name
    fontWeight: string,    // Font weight (300-800)
    fontSize: string       // Font size in px (10-60)
  },
  button: {
    borderRadius: string,      // Border radius in px
    shadow: string,            // 'none' | 'small' | 'medium' | 'large'
    alignment: string,         // 'left' | 'center' | 'right'
    backgroundColor: string,   // HEX color code
    textColor: string         // HEX color code
  },
  gallery: {
    alignment: string,     // 'start' | 'center' | 'end'
    spacing: string,       // Gap between items in px
    borderRadius: string   // Image border radius in px
  },
  layout: {
    cardCornerRadius: string,  // Card border radius in px
    containerPadding: string,  // Container padding in px
    sectionBgColor: string    // HEX color code
  },
  stroke: {
    color: string,     // Border color (HEX)
    weight: string     // Border width in px
  },
  layoutType: string   // 'grid' | 'list'
}
Default Configuration
javascriptconst defaultConfig = {
  typography: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '16'
  },
  button: {
    borderRadius: '8',
    shadow: 'medium',
    alignment: 'center',
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF'
  },
  gallery: {
    alignment: 'center',
    spacing: '16',
    borderRadius: '12'
  },
  layout: {
    cardCornerRadius: '16',
    containerPadding: '24',
    sectionBgColor: '#F9FAFB'
  },
  stroke: {
    color: '#E5E7EB',
    weight: '1'
  },
  layoutType: 'grid'
};
Configurable Props
Typography Options

Font Families: Inter, Roboto, Poppins, Open Sans, Lato
Font Weights: 300, 400, 500, 600, 700, 800
Font Size Range: 10px - 60px

Button Options

Border Radius: 0px - 50px
Shadow Styles:

none: No shadow
small: Subtle shadow (0 1px 2px)
medium: Moderate shadow (0 4px 6px)
large: Prominent shadow (0 10px 15px)


Alignment: left, center, right
Colors: Any HEX/RGB value

Gallery Options

Layout Types: Grid (3 columns) or List (1 column)
Spacing: 0px - 48px between images
Border Radius: 0px - 50px for images

Layout Options

Card Radius: 0px - 50px
Padding: 0px - 80px
Background: Any HEX/RGB color

Stroke Options

Weight: 0px - 10px
Color: Any HEX/RGB value


🛠️ How the Editor Works
Architecture Overview
The Dynamic UI Editor follows a unidirectional data flow pattern:
User Interaction → State Update → UI Re-render → Live Preview Update
State Management
The application uses React's useState hook to manage the configuration state:
javascriptconst [config, setConfig] = useState(defaultConfig);
All customizations update this central state, which then propagates to the preview component.
Update Mechanism
javascriptconst updateConfig = (category, key, value) => {
  setConfig(prev => ({
    ...prev,
    [category]: {
      ...prev[category],
      [key]: value
    }
  }));
};
This function:

Takes category (e.g., 'typography'), key (e.g., 'fontSize'), and value
Immutably updates the specific property
Triggers React re-render
Updates live preview instantly

Rendering Pipeline

Editor Controls → User adjusts sliders/pickers
State Update → Configuration object updated
Style Computation → Styles calculated from config
Preview Render → UI components re-rendered with new styles

Export Functionality
javascriptconst exportJSON = () => {
  const json = JSON.stringify(config, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ui-config.json';
  a.click();
  URL.revokeObjectURL(url);
};
This creates a downloadable JSON file containing all customization settings for portability and reusability.

🎨 Design Decisions & UX Improvements
1. Tabbed Interface
Decision: Organize controls into logical categories (Typography, Button, Gallery, Layout, Stroke)
Rationale:

Reduces cognitive load by grouping related controls
Prevents overwhelming users with too many options at once
Improves discoverability of features
Creates a clean, organized interface

2. Real-Time Preview
Decision: Update preview instantly on every change
Rationale:

Immediate visual feedback enhances user confidence
Reduces trial-and-error time
Mirrors professional design tools (Figma, Adobe XD)
Eliminates need for "Apply" or "Preview" buttons

3. Slider Controls for Numeric Values
Decision: Use range sliders for size, spacing, and radius values
Rationale:

More intuitive than text input for visual properties
Prevents invalid values (enforces min/max constraints)
Shows current value alongside slider
Faster interaction than typing numbers

Implementation:
javascript<input
  type="range"
  min="10"
  max="60"
  value={config.typography.fontSize}
  onChange={(e) => updateConfig('typography', 'fontSize', e.target.value)}
/>
4. Color Pickers
Decision: Native HTML5 color input for color selection
Rationale:

Familiar interface across all platforms
No external library dependencies
Supports HEX color values
Accessible and keyboard-navigable

5. Visual Button Groups
Decision: Use styled button groups for alignment and layout options
Rationale:

More visual than dropdowns for 2-3 options
Shows all available options at once
Clear active state indication
Touch-friendly on mobile devices

6. Shadow Style Presets
Decision: Provide named shadow options instead of manual shadow configuration
Rationale:

Simplifies complex CSS properties
Provides consistent design language
Prevents invalid shadow values
Faster selection process

Shadow Values:
javascriptconst shadowStyles = {
  none: 'none',
  small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  large: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
};
7. Layout Switching
Decision: Grid vs. List toggle for gallery layout
Rationale:

Demonstrates responsive design capabilities
Shows how single component adapts to different layouts
Common real-world requirement
Easy to understand and visualize

8. Export & Copy Features
Decision: Both JSON export and clipboard copy functionality
Rationale:

Export: Persistent storage, version control, sharing
Copy: Quick sharing, testing, documentation
Supports different workflows
No backend required

9. Consistent Spacing Scale
Decision: Use multiples of 4px for spacing values (0, 4, 8, 12, 16, 20, 24...)
Rationale:

Follows design system best practices
Creates visual rhythm and consistency
Aligns with Tailwind CSS spacing scale
Easier to maintain design coherence

10. Font Family Selection
Decision: Curated list of 5 popular web-safe fonts
Rationale:

Prevents FOUT (Flash of Unstyled Text)
All fonts widely available
Covers different design aesthetics:

Inter: Modern, clean (UI-focused)
Roboto: Android standard, versatile
Poppins: Geometric, friendly
Open Sans: Neutral, professional
Lato: Warm, corporate



11. Responsive Editor Layout
Decision: Side-by-side editor and preview on desktop, stacked on mobile
Rationale:
javascript<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-1">{/* Editor */}</div>
  <div className="lg:col-span-2">{/* Preview */}</div>
</div>

Optimizes screen real estate
Preview remains visible while editing
Mobile-friendly stacked layout
1:2 ratio gives preview more space

12. Visual Feedback
Decision: Smooth transitions, hover states, and active indicators
Implementation:
cssbutton, input, select {
  transition: all 0.2s ease-in-out;
}
Rationale:

Provides tactile feedback
Improves perceived performance
Makes interface feel polished
Guides user attention

13. Minimal External Dependencies
Decision: Only essential libraries (React, Lucide Icons, Tailwind CSS)
Rationale:

Faster bundle size
Fewer security vulnerabilities
Easier maintenance
Better performance

14. Immutable State Updates
Decision: Always create new objects instead of mutating state
Example:
javascriptsetConfig(prev => ({
  ...prev,
  [category]: {
    ...prev[category],
    [key]: value
  }
}));
Rationale:

Prevents bugs from state mutation
Enables React optimization
Makes debugging easier
Follows React best practices

15. Semantic HTML & Accessibility
Decision: Proper labels, semantic elements, and keyboard navigation
Implementation:
javascript<label className="block text-sm font-medium">
  Font Size: {config.typography.fontSize}px
</label>
<input type="range" ... />
Rationale:

Screen reader compatible
Keyboard navigable
Better SEO
WCAG compliance


🔄 Future Enhancements
Planned Features

 Preset System: Save and load configuration presets
 Theme Switching: Dark mode support
 Undo/Redo: History management for changes
 Import JSON: Load configurations from file
 More Layout Options: Masonry, carousel layouts
 Animation Controls: Transition timing and effects
 Responsive Breakpoints: Per-device customization
 Component Library: More UI components to customize
 Collaboration: Share configurations via URL
 A11y Checker: Accessibility validation tools


🧪 Testing
Manual Testing Checklist

 All typography controls update preview correctly
 Button styling changes reflect immediately
 Gallery layout switching works (grid/list)
 Color pickers update colors accurately
 Sliders show current values
 Export JSON downloads valid file
 Copy button copies to clipboard
 Tab navigation works smoothly
 Responsive design works on mobile
 No console errors

Browser Compatibility
Tested on:

✅ Chrome 120+
✅ Firefox 121+
✅ Safari 17+
✅ Edge 120+


📚 Technologies Used
TechnologyPurposeVersionReactUI Framework18.3.1ViteBuild Tool6.0.1Tailwind CSSStyling3.4.1Lucide ReactIcons0.263.1PostCSSCSS Processing8.x

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request

Contribution Guidelines

Follow existing code style
Write meaningful commit messages
Update documentation for new features
Test thoroughly before submitting PR


📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👤 Author
Babandeep Kaur

GitHub: @kaurbaban06
LinkedIn: Babandeep Kaur
Email: kaurbaban06@gmail.com


🙏 Acknowledgments

Built as part of the Dynamic UI Editor assignment
Inspired by modern design tools like Figma and Adobe XD
Icons provided by Lucide Icons
UI components styled with Tailwind CSS


📞 Support
If you have any questions or run into issues, please:

Check existing Issues
Create a new issue with detailed description
Contact via email (see Author section)


Made with ❤️ and React