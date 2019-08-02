declare module '*.jpg' {
	const image: any;
	export default image;
}

declare module '*.jpeg' {
	const image: any;
	export default image;
}

declare module '*.png' {
	const image: any;
	export default image;
}

declare module '*.gif' {
	const image: any;
	export default image;
}

declare module '*.ico' {
	const image: any;
	export default image;
}

declare module '*.webp' {
	const image: any;
	export default image;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
	export const ReactComponent: SvgrComponent;
	const url: string;
	export default url;
}
