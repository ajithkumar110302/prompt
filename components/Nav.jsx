"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDown, setToggleDown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="Promptopia Logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<span className="logo_text">Promptopia</span>
			</Link>

			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Prompt
						</Link>
						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>

						<Link href="/profile">
							<Image
								src={session?.user.image}
								alt="profile"
								width={37}
								height={37}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<div>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</div>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							alt="profile"
							width={37}
							height={37}
							className="rounded-full"
							onClick={() => setToggleDown((prev) => !prev)}
						/>

						{toggleDown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link "
									onClick={() => setToggleDown(false)}
								>
									My Profile
								</Link>

								<Link
									href="/create-prompt"
									className="dropdown_link "
									onClick={() => setToggleDown(false)}
								>
									Create Prompt
								</Link>

								<button
									type="button"
									onClick={() => {
										setToggleDown(false);
										signOut();
									}}
									className="w-full mt-5 black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
