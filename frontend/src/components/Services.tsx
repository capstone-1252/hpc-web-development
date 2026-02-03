import { loadServices, type Service } from "@/loaders/loadServices";
import { useEffect, useState } from "react"

export const ServicesSection = () => { 
	const [services, setServices] = useState<Service[]>([])
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const data = await loadServices()
			setServices(data);
			setLoading(false);
			console.log(data)
		}
		fetchData();
	})


	if(loading) <p>Loading...</p>
	return { services.map((service: any) => {
			return service.name
		}) }
}
