

const attachment (url,type) => () {

	const proto = 
		{
			type,
			payload: {
				url,
				is_reusable:true
			}
		}

	return Object.assign(Object.create(proto),{});
};

module.exports = attachment;