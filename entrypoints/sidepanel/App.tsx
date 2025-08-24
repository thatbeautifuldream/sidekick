import {
	WebPreview,
	WebPreviewNavigation,
	WebPreviewNavigationButton,
	WebPreviewUrl,
	WebPreviewBody,
} from "@/components/web-preview";
import { ArrowLeft, ArrowRight, RotateCcw, Home } from "lucide-react";
import { useUrlStore } from "@/lib/store";

function App() {
	const {
		currentUrl,
		inputUrl,
		history,
		historyIndex,
		setCurrentUrl,
		setInputUrl,
		addToHistory,
		goBack,
		goForward,
	} = useUrlStore();

	// Preset URLs
	const presetUrls = [
		{ name: "JSON Visualiser", url: "https://jsonvisualiser.com" },
		{ name: "Canvas", url: "https://canvas.milind.app" },
		{ name: "Portfolio", url: "https://milindmishra.com" },
	];

	const handleUrlChange = (url: string) => {
		setCurrentUrl(url);
		addToHistory(url);
	};

	const handlePresetClick = (url: string) => {
		setInputUrl(url);
		setCurrentUrl(url);
		addToHistory(url);
	};

	const handleRefresh = () => {
		// Force refresh by reloading the iframe
		const iframe = document.querySelector("iframe");
		if (iframe) {
			const currentSrc = iframe.src;
			iframe.src = "";
			iframe.src = currentSrc;
		}
	};

	const handleHome = () => {
		const homeUrl = "https://jsonvisualiser.com";
		setInputUrl(homeUrl);
		setCurrentUrl(homeUrl);
		addToHistory(homeUrl);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputUrl(e.target.value);
	};

	const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			let url = inputUrl.trim();
			// Add protocol if missing
			if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
				url = "https://" + url;
				setInputUrl(url);
			}
			setCurrentUrl(url);
			addToHistory(url);
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
						onClick={goBack}
						disabled={historyIndex <= 0}
						tooltip="Go back"
					>
						<ArrowLeft className="h-4 w-4" />
					</WebPreviewNavigationButton>

					<WebPreviewNavigationButton
						onClick={goForward}
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

					{/* Preset URL buttons */}
					{presetUrls.map((preset) => (
						<WebPreviewNavigationButton
							key={preset.url}
							onClick={() => handlePresetClick(preset.url)}
							tooltip={`Go to ${preset.name}`}
							className="text-xs px-2 py-1"
						>
							{preset.name}
						</WebPreviewNavigationButton>
					))}
				</WebPreviewNavigation>

				<WebPreviewBody src={currentUrl} />
			</WebPreview>
		</div>
	);
}

export default App;
