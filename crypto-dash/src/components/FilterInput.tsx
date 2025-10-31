interface FilterInputProps {
	filter: string;
	onFilterChange: React.Dispatch<React.SetStateAction<string>>;
}

const FilterInput = ({ filter, onFilterChange }: FilterInputProps) => {
	return (
		<div className='filter'>
			<input
				type='text'
				value={filter}
				onChange={(e) => onFilterChange(e.target.value)}
				placeholder='Filter coins by name or symbol'
			/>
		</div>
	);
};

export default FilterInput;
