import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
return (
	<div>
		<Navbar />
	<aside>
		
		<ul>

			<li>
				<img src="" alt="" />
				<NavLink to="">Overview</NavLink>
			</li>
			<li>
				<img src="" alt="" />
				<NavLink to="videos">Gestion films</NavLink>
			</li>
			<li>
				<img src="" alt="" />
				<NavLink to="jury">Gestion Jury</NavLink>
			</li>
			<li>
				<img src="" alt="" />
				<NavLink to="leaderboards">Leaderboard</NavLink>
			</li>
			<li>
				<img src="" alt="" />
				<NavLink to="events">Evenements</NavLink>
			</li>

		</ul>

	</aside>
	<main>
		<Outlet />
	</main>
	</div>
);
}
