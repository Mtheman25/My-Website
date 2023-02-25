import clsx from 'clsx';
import type {GetStaticProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {HiOutlineExternalLink} from 'react-icons/hi';
import {
	SiAmazonaws,
	SiBabel,
	SiDiscord,
	SiDocker,
	SiGit,
	SiGithub,
	SiGo,
	SiJavascript,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiReact,
	SiRedis,
	SiSpotify,
	SiTailwindcss,
	SiTwitter,
	SiTypescript,
	SiVisualstudiocode,
	SiWebpack,
	SiWebstorm,
	SiYarn,
} from 'react-icons/si';
import type {Data, LanyardResponse} from 'use-lanyard';
import {ContactForm} from '../components/contact-form';
import {CardHoverEffect, hoverClassName} from '../components/hover-card';
import {Time} from '../components/time';
import {useUpdatingLanyard} from '../hooks/lanyard';
import matrix from '../images/matrix.gif';
import me from '../images/me.jpg';
import {env} from '../server/env';
import {age, discordId} from '../utils/constants';
import {formatList} from '../utils/lists';

<script async src="https://arc.io/widget.min.js#MFNYDfDa"></script>

export const revalidate = 60;

export interface Props {
	lanyard: Data;
	location: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const lanyard = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`).then(
		res => res.json() as Promise<LanyardResponse>,
	);

	if (!lanyard.success) {
		throw new Error('Lanyard API failed');
	}

	const location = lanyard.data.kv.location ?? env.DEFAULT_LOCATION;

	return {
		revalidate: 60,
		props: {
			location,
			lanyard: lanyard.data,
		},
	};
};

export default function Home(props: Props) {
	const {data: lanyard} = useUpdatingLanyard(discordId, props.lanyard);

	const status = lanyard.discord_status ?? 'offline';

	return (
		<main className="mx-auto grid max-w-3xl grid-cols-6 gap-6 px-6 pb-40 pt-16">
			<div className="p-200 col-span-4 flex items-center justify-center overflow-hidden rounded-2xl bg-pink-200 dark:border-pink-500 dark:bg-pink-500/20 dark:backdrop-blur-2xl md:col-span-4 md:h-52">
				<div className="flex flex-col items-center space-y-4 py-8 px-6 md:flex-row md:space-y-0 md:space-x-4">
					<Image
						src={me}
						placeholder="blur"
						height={96}
						width={96}
						className="h-24 w-24 rounded-full border border-pink-500 object-cover"
						alt="Photo of me"
					/>

					<div className="space-y-1">
						<h1 className="text-center font-title text-xl font-bold tracking-tighter text-pink-900 dark:text-pink-300 dark:text-glow-pink-500/50 md:text-left">
							mtheman
						</h1>

						<p className="text-center text-pink-800 dark:text-pink-300/95 dark:text-glow-pink-500/50 md:text-left">
							{age} y/o proxy maker 🪄
						</p>

						<p className="text-center text-pink-800 dark:text-pink-300/80 dark:text-glow-pink-500/30 md:text-left">
							<Link href="https://mtheman.airlinemeals.net/" target="_blank" rel="noopener noreferrer">
								my other website for proxy enthusiasts ↗️
							</Link>
						</p>
					</div>
				</div>
			</div>

			<CardHoverEffect className="col-span-2 h-full">
				<Link
					href="https://twitter.com/Mtheman_"
					target="_blank"
					rel="noopener noreferrer"
					className={clsx(
						'flex h-full items-center justify-center rounded-2xl bg-sky-500 text-4xl text-white',
						hoverClassName,
					)}
				>
					<span className="sr-only">Twitter</span>
					<span className="transform-gpu transition group-hover:-rotate-[10deg] group-hover:scale-[1.3]">
						<SiTwitter />
					</span>
				</Link>
			</CardHoverEffect>

			<div
				className={clsx(
					'col-span-3 flex h-52 items-center justify-center rounded-2xl text-4xl md:col-span-2',
					{
						online: 'bg-green-500 text-green-50',
						idle: 'bg-orange-400 text-orange-50 ',
						dnd: 'bg-red-500 text-red-50',
						offline: 'bg-blurple text-white/90',
					}[status],
				)}
			>
				<div className="-rotate-[4deg] scale-[1] space-y-1 text-center md:scale-[1.2]">
					<h2>
						<SiDiscord className="inline" /> <span>{status}</span>
					</h2>

					<p className="text-base">
						{lanyard.discord_user.username}#{lanyard.discord_user.discriminator}
					</p>
				</div>
			</div>

			<Time />

			<CardHoverEffect className="col-span-3 h-full md:col-span-3">
				<Link
					href="https://github.com/Mtheman25"
					target="_blank"
					rel="noopener noreferrer"
					className={clsx(
						'group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl text-white',
						hoverClassName,
					)}
				>
					<span aria-hidden className="pointer-events-none absolute inset-0 -z-20">
						<Image
							src={matrix}
							alt="The Matrix scrolling characters effect"
							fill
							style={{objectFit: 'cover'}}
							className="brightness-[0.7]"
						/>
						<span className="absolute inset-0 bg-neutral-900/50" />
					</span>

					<span aria-hidden className="px-6 pt-6">
						<span className="flex justify-between">
							<SiGithub className="text-3xl" />
							<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
						</span>
					</span>

					<span className="space-y-0.5 px-6 pb-6">
						<span className="block font-title font-bold">github</span>

						<span className="block text-sm">my work &amp; contributions</span>
					</span>
				</Link>
			</CardHoverEffect>

			<CardHoverEffect className="col-span-3 h-52">
				{!lanyard?.spotify || !lanyard.spotify.album_art_url ? (
					<Link
						href="https://open.spotify.com/playlist/18R9Cntl2PZEaGMLz4cyX2"
						target="_blank"
						rel="noopener noreferrer"
						className={clsx('group relative flex h-full overflow-hidden rounded-2xl', hoverClassName)}
					>
						<span className="absolute inset-0 -z-10">
							<Image
								src={'https://i.scdn.co/image/ab67706c0000da84e581815a92946c295b02b936'}
								className="bg-black brightness-50"
								fill
								alt="Album cover art"
								style={{objectFit: 'cover'}}
							/>
						</span>

						<span className="flex flex-1 flex-col justify-between p-6 text-white">
							<span className="flex justify-between">
								<SiSpotify className="text-2xl" />
								<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
							</span>

							<div className="space-y-0.5">
								<h2 className="font-title font-bold">
									<span className="font-medium">playlist:</span>early travel
								</h2>

								<p className="text-sm">because you had to get a 3 hour bus journey in the early hours</p>
							</div>
						</span>
					</Link>
				) : (
					<Link
						key={lanyard.spotify.track_id}
						suppressHydrationWarning
						href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
						target="_blank"
						rel="noopener noreferrer"
						className={clsx('group relative flex h-full overflow-hidden rounded-2xl', hoverClassName)}
					>
						<span className="absolute inset-0 -z-10">
							<Image
								suppressHydrationWarning
								src={lanyard.spotify.album_art_url}
								className="bg-black brightness-50 transition-all duration-500 will-change-[transform,_filter] group-hover:scale-[1.15] group-hover:brightness-[0.4] group-hover:saturate-0"
								fill
								alt="Album cover art"
								style={{objectFit: 'cover'}}
							/>
						</span>

						<span className="flex flex-1 flex-col justify-between p-6 text-white">
							<span className="flex justify-between">
								<SiSpotify className="text-2xl" />
								<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
							</span>

							<span>
								<h2>
									<span
										className="mb-0.5 mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"
										aria-hidden
									/>{' '}
									Listening to{' '}
									<span className="font-bold" suppressHydrationWarning>
										{lanyard.spotify.song}
									</span>{' '}
									by{' '}
									<span className="font-bold" suppressHydrationWarning>
										{formatList(lanyard.spotify.artist.split('; '), 'conjunction')}
									</span>
									.
								</h2>
							</span>
						</span>
					</Link>
				)}
			</CardHoverEffect>

			<div className="group relative col-span-3 flex h-full min-h-[13rem] flex-shrink-0 overflow-hidden rounded-2xl">
		

				<div className="absolute top-1/2 left-1/2 z-10 flex w-full flex-shrink-0 -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-2">
					<div aria-hidden className="absolute translate-y-[14px]">
						<span className="block h-12 w-12 animate-ping rounded-full bg-lime-500 duration-1000" />
					</div>

					<Image
						src={me}
						alt="Photo of me above a map of my current location"
						height={60}
						width={60}
						className="h-15 w-15 z-20 rounded-full border-2 border-black transition-transform duration-500 group-hover:-rotate-[10deg] group-hover:scale-110"
					/>

					<p className="rounded-full bg-white/10 pl-2.5 pr-3 font-bold text-white/95 backdrop-blur-md">
						📍 {props.location}
					</p>
				</div>
			</div>

			<div className="col-span-3 flex items-center justify-center rounded-2xl bg-fuchsia-700 p-6 text-fuchsia-100 md:col-span-2">
				<div className="grid w-full grid-cols-4 grid-rows-4 gap-4 [&>svg]:w-full [&>svg]:text-center">
					<SiTypescript size={24} />
					<SiDocker size={24} />
					<SiNextdotjs size={24} />
					<SiRedis size={24} />
					<SiPostgresql size={24} />
					<SiReact size={24} />
					<SiTailwindcss size={24} />
					<SiNodedotjs size={24} />
					<SiGo size={24} />
					<SiJavascript size={24} />
					<SiAmazonaws size={24} />
					<SiWebstorm size={24} />
					<SiWebpack size={24} />
					<SiBabel size={24} />
					<SiYarn size={24} />
					<SiGit size={24} />
					<SiSpotify size={24} />
					<SiMongodb size={24} />
					<SiVisualstudiocode size={24} />
					<SiDiscord size={24} />
				</div>
			</div>

			<div className="col-span-6 space-y-2 rounded-2xl bg-yellow-200 p-6 dark:bg-indigo-800 md:col-span-4">
				<h2 className="font-title text-xl font-bold">
					hello world <span className="inline dark:hidden">🌻</span>
					<span className="hidden dark:inline">⭐</span>
				</h2>

				<p>
					My name is Mtheman, and I'm a proxy developer from the United States. I've been programming for as long as I
					can remember, and I'm currently spending my time creating my{' '}
					<Link className="underline" href="https://discord.com/api/oauth2/authorize?client_id=1075560617760526427&permissions=8&scope=bot">
						ChatGPT Bot!
					</Link>
					.
				</p>

				<p>
					Beyond programming, I'm really interested in listening to music, and just messing
					around with my pc.
				</p>
			</div>

			<div className="col-span-6 space-y-4 rounded-2xl bg-lime-400 p-6 text-black md:col-span-6">
				<ContactForm />
			</div>
		</main>
	);
}
