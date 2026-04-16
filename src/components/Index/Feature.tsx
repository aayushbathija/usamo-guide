import classNames from 'classnames';
import React from 'react';

export const Feature = ({
  iconSrc,
  iconFallbackSrc,
  iconAlt,
  iconClasses,
  title,
  blobClasses,
  feature,
  featurePosition = 'left',
  fade = 'right',
  children,
  className,
}: {
  iconSrc: string;
  iconFallbackSrc?: string;
  iconAlt: string;
  iconClasses: string;
  title: string;
  blobClasses: string;
  feature: JSX.Element;
  featurePosition?: 'left' | 'right';
  fade?: 'none' | 'right';
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  const [currentIconSrc, setCurrentIconSrc] = React.useState(iconSrc);

  React.useEffect(() => {
    setCurrentIconSrc(iconSrc);
  }, [iconSrc]);

  return (
    <div
      className={classNames(
        'ui-card relative overflow-hidden p-5 sm:p-6 md:p-8 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,84,139,0.4)]',
        className
      )}
    >

      <div
        className={classNames(
          'relative text-center md:text-left h-full',
          featurePosition === 'left' ? 'sm:pr-1' : 'sm:pl-1'
        )}
      >
        <div>
          <div
            className={classNames(
              'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br text-white md:mx-0',
              iconClasses
            )}
          >
            <img
              src={currentIconSrc}
              alt={iconAlt}
              className="h-6 w-6"
              loading="lazy"
              onError={() => {
                if (iconFallbackSrc && currentIconSrc !== iconFallbackSrc) {
                  setCurrentIconSrc(iconFallbackSrc);
                }
              }}
            />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 md:mt-4 md:text-lg dark:text-gray-300">
          {children}
        </p>

        <div className="relative mt-6">
          <div className="relative z-10">{feature}</div>

          <div
            className={classNames(
              'pointer-events-none absolute -bottom-6 h-24 w-48 transform-gpu rounded-full opacity-[35%] blur-2xl',
              featurePosition === 'left' ? '-right-6' : '-left-6',
              blobClasses
            )}
          />
        </div>

        {fade !== 'none' && (
          <div
            className={classNames(
              'pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-linear-to-t from-white dark:from-gray-900 to-transparent',
              featurePosition === 'left'
                ? 'from-white dark:from-gray-900'
                : 'from-white dark:from-gray-900'
            )}
          />
        )}
      </div>
    </div>
  );
};
