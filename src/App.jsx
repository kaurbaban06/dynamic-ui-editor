import React, { useState } from 'react';
import { Download, Copy, Check, Layout, Type, Square, Image, Palette, Move } from 'lucide-react';

const DynamicUIEditor = () => {
  const [config, setConfig] = useState({
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
  });

  const [activeTab, setActiveTab] = useState('typography');
  const [copied, setCopied] = useState(false);

  const updateConfig = (category, key, value) => {
    setConfig(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const exportJSON = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ui-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shadowStyles = {
    none: 'none',
    small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    large: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  };

  const fontFamilies = ['Inter', 'Roboto', 'Poppins', 'Open Sans', 'Lato'];
  const fontWeights = ['300', '400', '500', '600', '700', '800'];

  const renderPreview = () => {
    const containerStyle = {
      fontFamily: config.typography.fontFamily,
      fontWeight: config.typography.fontWeight,
      fontSize: `${config.typography.fontSize}px`,
      backgroundColor: config.layout.sectionBgColor,
      padding: `${config.layout.containerPadding}px`,
      borderRadius: `${config.layout.cardCornerRadius}px`,
      border: `${config.stroke.weight}px solid ${config.stroke.color}`,
      minHeight: '600px'
    };

    const buttonStyle = {
      borderRadius: `${config.button.borderRadius}px`,
      boxShadow: shadowStyles[config.button.shadow],
      backgroundColor: config.button.backgroundColor,
      color: config.button.textColor,
      padding: '12px 24px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px'
    };

    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: config.button.alignment,
      marginTop: '24px'
    };

    const galleryStyle = {
      display: 'grid',
      gridTemplateColumns: config.layoutType === 'grid' ? 'repeat(3, 1fr)' : '1fr',
      gap: `${config.gallery.spacing}px`,
      justifyContent: config.gallery.alignment,
      marginTop: '32px'
    };

    const imageStyle = {
      borderRadius: `${config.gallery.borderRadius}px`,
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      backgroundColor: '#E5E7EB'
    };

    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: `${Math.min(parseInt(config.typography.fontSize) * 2, 48)}px`,
            fontWeight: '700',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Product Showcase
          </h1>
          <p style={{ 
            color: '#6B7280',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            Discover our latest collection of premium products designed for modern living
          </p>
        </div>

        <div style={galleryStyle}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={{ 
              backgroundColor: 'white',
              borderRadius: `${config.gallery.borderRadius}px`,
              overflow: 'hidden',
              border: `${config.stroke.weight}px solid ${config.stroke.color}`
            }}>
              <div style={imageStyle} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ 
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#111827'
                }}>
                  Product {item}
                </h3>
                <p style={{ 
                  color: '#6B7280',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  Premium quality product description
                </p>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    fontWeight: '700',
                    color: config.button.backgroundColor,
                    fontSize: '18px'
                  }}>
                    ${99 + item * 10}
                  </span>
                  <button style={{
                    ...buttonStyle,
                    padding: '8px 16px',
                    fontSize: '12px'
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={buttonContainerStyle}>
          <button style={buttonStyle}>
            View All Products
          </button>
        </div>
      </div>
    );
  };

  const EditorPanel = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">UI Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={copyJSON}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={exportJSON}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: 'typography', icon: Type, label: 'Typography' },
          { id: 'button', icon: Square, label: 'Button' },
          { id: 'gallery', icon: Image, label: 'Gallery' },
          { id: 'layout', icon: Layout, label: 'Layout' },
          { id: 'stroke', icon: Palette, label: 'Stroke' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'typography' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <select
                value={config.typography.fontFamily}
                onChange={(e) => updateConfig('typography', 'fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontFamilies.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
              <select
                value={config.typography.fontWeight}
                onChange={(e) => updateConfig('typography', 'fontWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontWeights.map(weight => (
                  <option key={weight} value={weight}>{weight}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {config.typography.fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="60"
                value={config.typography.fontSize}
                onChange={(e) => updateConfig('typography', 'fontSize', e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {activeTab === 'button' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius: {config.button.borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={config.button.borderRadius}
                onChange={(e) => updateConfig('button', 'borderRadius', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
              <select
                value={config.button.shadow}
                onChange={(e) => updateConfig('button', 'shadow', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
              <div className="flex gap-2">
                {['left', 'center', 'right'].map(align => (
                  <button
                    key={align}
                    onClick={() => updateConfig('button', 'alignment', align)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      config.button.alignment === align
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={config.button.backgroundColor}
                onChange={(e) => updateConfig('button', 'backgroundColor', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={config.button.textColor}
                onChange={(e) => updateConfig('button', 'textColor', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout Type</label>
              <div className="flex gap-2">
                {['grid', 'list'].map(type => (
                  <button
                    key={type}
                    onClick={() => setConfig(prev => ({ ...prev, layoutType: type }))}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      config.layoutType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Alignment</label>
              <div className="flex gap-2">
                {['start', 'center', 'end'].map(align => (
                  <button
                    key={align}
                    onClick={() => updateConfig('gallery', 'alignment', align)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      config.gallery.alignment === align
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spacing: {config.gallery.spacing}px
              </label>
              <input
                type="range"
                min="0"
                max="48"
                value={config.gallery.spacing}
                onChange={(e) => updateConfig('gallery', 'spacing', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Border Radius: {config.gallery.borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={config.gallery.borderRadius}
                onChange={(e) => updateConfig('gallery', 'borderRadius', e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}

        {activeTab === 'layout' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Corner Radius: {config.layout.cardCornerRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={config.layout.cardCornerRadius}
                onChange={(e) => updateConfig('layout', 'cardCornerRadius', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Container Padding: {config.layout.containerPadding}px
              </label>
              <input
                type="range"
                min="0"
                max="80"
                value={config.layout.containerPadding}
                onChange={(e) => updateConfig('layout', 'containerPadding', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Background Color</label>
              <input
                type="color"
                value={config.layout.sectionBgColor}
                onChange={(e) => updateConfig('layout', 'sectionBgColor', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </>
        )}

        {activeTab === 'stroke' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stroke Color</label>
              <input
                type="color"
                value={config.stroke.color}
                onChange={(e) => updateConfig('stroke', 'color', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stroke Weight: {config.stroke.weight}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={config.stroke.weight}
                onChange={(e) => updateConfig('stroke', 'weight', e.target.value)}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dynamic UI Editor</h1>
          <p className="text-gray-600">Customize your UI design in real-time with intuitive controls</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <EditorPanel />
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Live Preview</h2>
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicUIEditor;