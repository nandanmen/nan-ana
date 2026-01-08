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

	return (
		<main className="flex flex-col mt-16 items-center w-screen overflow-hidden">
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
						<g clip-path="url(#clip0_3_228)">
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
				<p className="text-center flex flex-col items-center md:flex-row md:gap-5 text-7xl font-bold">
					<span className="flex gap-4">
						<span>
							{days}
							<span className="text-4xl">d</span>
						</span>
						<span>
							{hours}
							<span className="text-4xl">h</span>
						</span>
					</span>
					<span className="flex gap-4 -mt-3 md:mt-0">
						<span>
							{minutes}
							<span className="text-4xl">m</span>
						</span>
						<span>
							{seconds}
							<span className="text-4xl">s</span>
						</span>
					</span>
				</p>
			</div>
			<img
				src="/eiffel.png"
				className="-mb-[100px] mt-12 ml-6 scale-125 dark:invert"
				alt="Eiffel Tower"
			/>
		</main>
	);
}
