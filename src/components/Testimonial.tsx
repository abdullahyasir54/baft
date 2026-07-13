export default function Testimonial() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-[#0c0c0c] md:py-32">
      <div className="liquid-glass p-xl border-2 border-white/10 max-w-4xl mx-auto text-center relative transition-all duration-300 hover:scale-[1.01] hover:border-white/30">
        <span className="text-[96px] leading-none text-[#D6E702] opacity-30 absolute top-6 left-8 font-serif select-none">
          &ldquo;
        </span>
        <p className="font-headline-lg text-headline-lg leading-tight mb-lg">
          &ldquo;Baft didn&apos;t just change our conversion rate; it changed how we design. Knowing customers can see the drape instantly has redefined our digital catalog.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-md">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D6E702] shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMUfffVWR2RefsNyUqk5wyknW15HtlnW9TVgbMHDtUII9IhQEoIIR0A1nf1IsaKOpKmYevqI5w7UZoUNB4TIT4RnC101kBFo0CHE_Zy_GZqa4JT4jB9CEJ2J9Bnlg-39poSu5OJrwekVGX2S2s7Qb6DC5JeLjZ8iVnQfESeqlcyJCSOxmvuMKUwDL3KRaoVRvt5jg9iKpp58D6MbVr4DOfP1IGiPXCZ0NTimOFWl9SWvcu64oUL6D6gbNNDA8bOlrXNDyF4X1g3fA"
              alt="Elena Sterling"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="font-label-bold text-label-bold text-white">Elena Sterling</div>
            <div className="text-white/40 text-sm">CEO, Sterling Collective</div>
          </div>
        </div>
      </div>
    </section>
  )
}
