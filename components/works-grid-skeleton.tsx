export function WorksGridSkeleton() {
  return (
    <div className="shelf-skeleton" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} />
      ))}
    </div>
  )
}
