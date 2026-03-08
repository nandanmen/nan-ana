import { useEffect, useState } from "react";

export function meta() {
	return [
		{ title: "nanana" },
		{ name: "description", content: "Counting down to March 10th at 13:35" },
	];
}

export function loader() {
	return {};
}

export default function Home() {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [debugZero, setDebugZero] = useState(false);

	useEffect(() => {
		const calculateTime = () => {
			const now = new Date();
			const targetDate = new Date(now.getFullYear(), 2, 10, 14, 35); // March 10th at 13:35 (month is 0-indexed)

			// If March 10th 13:35 has passed this year, target next year
			if (targetDate < now) {
				targetDate.setFullYear(now.getFullYear() + 1);
			}

			const difference = targetDate.getTime() - now.getTime();

			if (difference > 0) {
				const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hoursRemaining = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
				);
				const minutesRemaining = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60),
				);
				const secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000);

				setDays(daysRemaining);
				setHours(hoursRemaining);
				setMinutes(minutesRemaining);
				setSeconds(secondsRemaining);
			} else {
				setDays(0);
				setHours(0);
				setMinutes(0);
				setSeconds(0);
			}
		};

		calculateTime();
		const interval = setInterval(calculateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	// How many leading parts have reached 0 (days → hours → minutes → seconds)
	const parts = [days, hours, minutes, seconds];
	let scaleLevel = 0;
	for (const p of parts) {
		if (p !== 0) break;
		scaleLevel++;
	}

	const countdownSizeClass =
		scaleLevel === 0 || scaleLevel === 1
			? "text-7xl"
			: scaleLevel === 2
				? "text-9xl"
				: scaleLevel === 3
					? "text-[10rem]"
					: "text-[14rem]";

	const countdownReachedZero =
		days === 0 && hours === 0 && minutes === 0 && seconds === 0;
	const showBonVoyage = countdownReachedZero || debugZero;

	const showDays = days > 0;
	const showHours = days > 0 || hours > 0;
	const showMinutes = days > 0 || hours > 0 || minutes > 0;
	const showSeconds = days > 0 || hours > 0 || minutes > 0 || seconds > 0;
	const visibleCount = [showDays, showHours, showMinutes, showSeconds].filter(
		Boolean,
	).length;

	const countdownLayoutClass =
		visibleCount === 4
			? "flex flex-col justify-center items-center"
			: "flex flex-wrap justify-center items-center gap-x-4";

	const frenchCircleItems = [
		{ src: "/aux-raisin.png", alt: "Pain aux raisins" },
		{ src: "/baguette.png", alt: "Baguette" },
		{ src: "/croissant.png", alt: "Croissant" },
		{ src: "/macaron.png", alt: "Macaron" },
		{ src: "/coffee.png", alt: "Coffee" },
	];
	const circleRadius = 140;
	const circleItemSize = 56;

	return (
		<main className="flex flex-col mt-16 items-center w-screen">
			<div className="flex flex-col gap-4 items-center">
				<h1 className="flex flex-col leading-[0.8] text-3xl font-bold mb-16">
					<span>nan</span>
					<span>ana</span>
				</h1>
				<div className="text-4xl font-medium flex">
					<p
						style={{
							transform: "rotate(-20deg)",
						}}
					>
						YVR
					</p>
					<svg
						width="100"
						viewBox="0 0 296 71"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						className="-ml-2"
					>
						<g clipPath="url(#clip0_3_228)">
							<path
								d="M-3.10351e-06 71C13.102 44.3623 83.0496 8.91537 132.922 2.62301C186.809 -4.29859 217.873 1.57428 281.27 31.1484C280.425 26.9535 279.368 23.5976 278.945 20.4514C278.311 16.8857 277.677 13.1103 277.889 9.54461C277.889 8.49589 279.791 6.60818 281.059 6.39843C282.327 6.18869 284.44 7.6569 284.862 8.70563C288.666 18.7734 292.047 28.8412 295.64 39.1187C296.696 42.4746 295.428 44.9916 291.836 46.0403C278.1 49.3962 264.364 52.9619 250.417 56.1081C247.247 56.7373 243.443 55.8983 239.217 55.8983C242.598 46.8793 250.206 47.928 255.7 45.6208C261.406 43.1039 267.534 41.6357 274.93 39.1187C257.39 27.373 239.639 20.0319 220.832 15.4175C151.941 -1.78164 88.544 12.481 30.0078 50.6547C22.4002 55.6886 15.4265 61.5615 8.03027 66.8051C5.70572 67.8538 3.59247 68.9026 -3.10351e-06 71Z"
								fill="currentColor"
							/>
						</g>
						<defs>
							<clipPath id="clip0_3_228">
								<rect width="296" height="71" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<p
						style={{
							transform: "rotate(20deg)",
						}}
					>
						CDG
					</p>
				</div>

				{showBonVoyage ? (
					<>
						<div
							className="relative flex items-center justify-center mt-8"
							style={{
								width: circleRadius * 2 + circleItemSize * 2,
								height: circleRadius * 2 + circleItemSize * 2,
							}}
						>
							<div className="h-full w-full">
								{frenchCircleItems.map((item, i) => {
									const angle =
										(i / frenchCircleItems.length) * 2 * Math.PI - Math.PI / 2;
									const x = Math.cos(angle) * circleRadius;
									const y = Math.sin(angle) * circleRadius;
									return (
										<img
											key={item.src}
											src={item.src}
											alt={item.alt}
											className="absolute object-contain dark:invert"
											style={{
												width: circleItemSize,
												height: circleItemSize,
												left: "50%",
												top: "50%",
												transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
											}}
										/>
									);
								})}
							</div>
							<div className="absolute flex flex-col items-center justify-center">
								{/* <img
									src="/plane.png"
									alt=""
									className="object-contain -mb-2 dark:invert"
									style={{ width: 64, height: 48 }}
								/> */}
								<img
									src="/bon-voyage.png"
									alt="Bon voyage"
									className="object-contain dark:invert rotate-[-5deg]"
									style={{ width: 280, height: "auto" }}
								/>
							</div>
						</div>
						{debugZero && (
							<button
								type="button"
								onClick={() => setDebugZero(false)}
								className="mt-6 px-4 py-2 text-sm font-medium rounded border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
							>
								Reset
							</button>
						)}
					</>
				) : (
					<>
						<p
							className={`text-center font-bold ${countdownLayoutClass} ${countdownSizeClass}`}
						>
							{visibleCount === 4 ? (
								<>
									<span className="flex gap-x-2 w-full min-w-max">
										<span className="flex-1 flex items-end  justify-end">
											{days}
											<span className="text-4xl -translate-y-2">d</span>
										</span>
										<span className="flex-1 flex items-end  justify-start">
											{hours}
											<span className="text-4xl -translate-y-2">h</span>
										</span>
									</span>
									<span className="flex gap-x-2 w-full min-w-max">
										<span className="flex-1 flex items-end justify-end">
											{minutes}
											<span className="text-4xl -translate-y-2">m</span>
										</span>
										<span className="flex-1 flex items-end  justify-start">
											{seconds}
											<span className="text-4xl -translate-y-2">s</span>
										</span>
									</span>
								</>
							) : (
								<>
									{showDays && (
										<span>
											{days}
											<span className="text-4xl">d</span>
										</span>
									)}
									{showHours && (
										<span>
											{hours}
											<span className="text-4xl">h</span>
										</span>
									)}
									{showMinutes && (
										<span>
											{minutes}
											<span className="text-4xl">m</span>
										</span>
									)}
									{showSeconds && (
										<span>
											{seconds}
											<span className="text-4xl">s</span>
										</span>
									)}
								</>
							)}
						</p>
						<div className="flex justify-center overflow-hidden w-screen min-w-0">
							<img
								src="/eiffel.png"
								className="block ml-6 dark:invert max-w-max"
								height={600}
								width={500}
								alt="Eiffel Tower"
							/>
						</div>
						<button
							type="button"
							onClick={() => setDebugZero(true)}
							className="px-4 py-2 text-sm font-medium rounded border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
						>
							Debug
						</button>
					</>
				)}
			</div>
		</main>
	);
}
