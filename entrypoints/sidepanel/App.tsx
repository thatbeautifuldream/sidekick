import {
    WebPreview,
    WebPreviewNavigation,
    WebPreviewNavigationButton,
    WebPreviewUrl,
    WebPreviewBody,
} from "@/components/web-preview";
import { ArrowLeft, ArrowRight, RotateCcw, Home } from "lucide-react";
import { useState } from "react";

function App() {
    const [currentUrl, setCurrentUrl] = useState("https://jsonvisualiser.com");
    const [inputUrl, setInputUrl] = useState("https://jsonvisualiser.com");
    const [history, setHistory] = useState<string[]>(["https://jsonvisualiser.com"]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const handleUrlChange = (url: string) => {
        setCurrentUrl(url);
        // Add to history if it's a new URL
        if (url !== history[historyIndex]) {
            const newHistory = [...history.slice(0, historyIndex + 1), url];
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    };

    const handleBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const url = history[newIndex];
            setCurrentUrl(url);
            setInputUrl(url);
        }
    };

    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const url = history[newIndex];
            setCurrentUrl(url);
            setInputUrl(url);
        }
    };

    const handleRefresh = () => {
        // Force refresh by reloading the iframe
        const iframe = document.querySelector('iframe');
        if (iframe) {
            const currentSrc = iframe.src;
            iframe.src = '';
            iframe.src = currentSrc;
        }
    };

    const handleHome = () => {
        const homeUrl = "https://jsonvisualiser.com";
        setInputUrl(homeUrl);
        setCurrentUrl(homeUrl);
        handleUrlChange(homeUrl);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputUrl(e.target.value);
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let url = inputUrl.trim();
            // Add protocol if missing
            if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
                setInputUrl(url);
            }
            setCurrentUrl(url);
            handleUrlChange(url);
        }
    };

    return (
        <div className="h-screen w-full">
            <WebPreview
                defaultUrl={currentUrl}
                onUrlChange={handleUrlChange}
                className="h-full"
            >
                <WebPreviewNavigation>
                    <WebPreviewNavigationButton
                        onClick={handleBack}
                        disabled={historyIndex <= 0}
                        tooltip="Go back"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </WebPreviewNavigationButton>

                    <WebPreviewNavigationButton
                        onClick={handleForward}
                        disabled={historyIndex >= history.length - 1}
                        tooltip="Go forward"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </WebPreviewNavigationButton>

                    <WebPreviewNavigationButton
                        onClick={handleRefresh}
                        tooltip="Refresh page"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </WebPreviewNavigationButton>

                    <WebPreviewNavigationButton
                        onClick={handleHome}
                        tooltip="Go to home page"
                    >
                        <Home className="h-4 w-4" />
                    </WebPreviewNavigationButton>

                    <WebPreviewUrl
                        value={inputUrl}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyPress}
                        placeholder="Enter URL or search..."
                    />
                </WebPreviewNavigation>

                <WebPreviewBody src={currentUrl} />

            </WebPreview>
        </div>
    );
}

export default App;
